import Decimal from "decimal.js";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { SubjectConfig, weaponRangeOf } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { calculateValue, resolveDynamicValue } from "core/value-ratio";
import { EquipmentID, EquipmentStatusDictionary } from "core/equipment";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";
import Chaos from "./chaos";

/**
 * 特性「渦流」の回復によるオーバーヒール（最大体力を超えた回復分の一時的な最大体力への変換）量。
 * 実際の変換量は発動時の自身の現在体力（＝失った体力）に依存するが、`ChaosBuffDebuff`は
 * `currentHPRatio`（`SubjectPerpetualStatus`等と同様に素通しされる体力スライダーの値）を実際に
 * 受け取れるため、`critical_blow`（理論上の最大値で近似）と異なり実際の失った体力から計算できる。
 * 回復量（`Chaos.syphonMaelstorm.heal`。additionalAttack/amp/maxHP/lostHPの4項目からなる`ValueRatio`）が
 * 失った体力を上回った差分だけを返す（下回る場合は0）
 */
function syphonMaelstormOverheal(status: Status, config: SubjectConfig, currentHPRatio: number): Decimal {
    const maxHP = status.maxHp.calculatedValue;
    const hp = maxHP.percent(currentHPRatio);
    const lostHP = maxHP.sub(hp);

    const { static: staticHeal, dynamic } = calculateValue(Chaos.syphonMaelstorm.heal, status, config, "other");
    const { potency: dynamicHeal } = resolveDynamicValue(dynamic, undefined, { hp, maxHP }, { hp, maxHP });

    return Decimal.max(staticHeal.add(dynamicHeal).sub(lostHP), 0);
}

// 特性「力の蓄積」のゲーム内時刻選択肢（0="1日目昼"〜12="7日目"。`Chaos.powerCrescendo.adaptiveForce`と
// 同じ13要素、augment.jsonに表示名を用意）
const PowerCrescendoTimeLabels = Array.from({ length: Chaos.powerCrescendo.adaptiveForce.length }, (_, i) => `augment.game-time.${i}`);

// 特性「オーバーウォッチ」の追加ステータス発動判定。しきい値判定は自己バフ自身を含まない中間状態の
// `status.cooldownReduction`（ヘイスト値からの変換済み％）にこの特性自身のクールダウン減少分を単純加算した
// 近似値で行う（他の同時選択中の自己バフによるクールダウン減少や、正確なヘイスト再計算は考慮できない）
function overwatchThresholdMet(status: Status): boolean {
    return status.cooldownReduction.calculatedValue.add(Chaos.overwatch.status.cooldownReduction).greaterThanOrEqualTo(Chaos.overwatch.threshold);
}

/**
 * 特性「極上のコレクション」の判定に使う、現在の装備構成における等級別の個数。装備ID
 * （`config.equipment`）から`EquipmentStatusDictionary`を引いて`itemGrade`（`core/equipment/status.ts`の
 * `Tier`。`"Epic"`＝英雄、`"Legend"`＝伝説、`"Mythic"`＝神話）を取得し集計する。伝説・神話は英雄の、
 * 神話は伝説の上位互換であるため、それぞれの下位しきい値のカウントにも重複して算入する
 * （`heroicOrAbove`は装備されている全アイテム数と等価、`legendaryOrAbove`は伝説+神話の数）
 */
function celestialCollectionCounts(config: SubjectConfig): { heroicOrAbove: number, legendaryOrAbove: number, mythic: number } {
    const { isChestDavid, ...equipment } = config.equipment;
    const tiers = Object.values(equipment)
        .filter((id): id is EquipmentID => id != null)
        .map(id => EquipmentStatusDictionary[id].itemGrade);

    return {
        heroicOrAbove: tiers.length,
        legendaryOrAbove: tiers.filter(t => t == "Legend" || t == "Mythic").length,
        mythic: tiers.filter(t => t == "Mythic").length
    };
}

/**
 * カオス系特性（`chaos.ts`）由来の選択式自己バフ（`origin: "augment"`）。`buff-debuff.ts`の
 * `AugmentBuffDebuff`から集約される
 */
export const ChaosBuffDebuff = (config: SubjectConfig, status: Status, currentHPRatio: number): Record<string, BuffDebuffDefinition> => ({
    // 渦流: 自己バフ、移動速度増加（近接/遠隔で効果量が異なる）
    "augment.syphon-maelstorm-movement-speed": {
        origin: "augment",
        nameIntlID: "Trait/Name/7300301",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7300301",
                value: {
                    type: "constant",
                    value: (weaponRangeOf(config) == "melee" ? Chaos.syphonMaelstorm.movementSpeed.melee : Chaos.syphonMaelstorm.movementSpeed.range) * stack
                }
            }]
        })
    },
    // 渦流: 回復によるオーバーヒール分を一時的な最大体力に変換する効果（`syphonMaelstormOverheal`参照）を、
    // 発動していたかどうかのON/OFFの選択式自己バフとして近似する
    "augment.syphon-maelstorm-overheal": {
        origin: "augment",
        nameIntlID: "Trait/Name/7300301",
        maxStack: 1,
        buff: stack => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7300301",
                value: { type: "constant", value: syphonMaelstormOverheal(status, config, currentHPRatio).mul(stack) }
            }]
        })
    },
    // 徹甲弾: 自己バフ、防御貫通（割合）増加。l10n上"徹甲弾"という同名のTrait/Nameが2件（`7010101`/`7310401`）
    // 存在するが、`7310401`は`chaos.ts`のサブ特性右（overwatch:7310301, quickDraw:7310601,
    // celestialCollection:7310701）と同じ番号帯にあるためこちらを使用（`7010101`は破壊系の番号帯）
    "augment.stopping-power": {
        origin: "augment",
        nameIntlID: "Trait/Name/7310401",
        maxStack: 1,
        buff: stack => ({
            penetrationDefenseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7310401",
                value: { type: "constant", value: Chaos.stoppingPower.effect.penetrationDefense * stack }
            }]
        })
    },
    // 速射: 自己バフ、適合能力値（レベル依存）+攻撃速度増加
    "augment.quick-draw": {
        origin: "augment",
        nameIntlID: "Trait/Name/7310601",
        maxStack: 1,
        buff: stack => ({
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7310601",
                value: { type: "constant", value: (Chaos.quickDraw.status.adaptiveForce.base + Chaos.quickDraw.status.adaptiveForce.level * config.level) * stack }
            }],
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7310601",
                value: { type: "constant", value: Chaos.quickDraw.status.attackSpeed * stack }
            }]
        })
    },
    // 力の蓄積: 自己バフ、ゲーム内時刻に応じた適合能力値増加。ユーザーがプルダウンで時刻を選択する
    // （`PowerCrescendoTimeLabels`）
    "augment.power-crescendo": {
        origin: "augment",
        nameIntlID: "Trait/Name/7310101",
        maxStack: Chaos.powerCrescendo.adaptiveForce.length - 1,
        stackLabels: PowerCrescendoTimeLabels,
        buff: stack => ({
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7310101",
                value: { type: "constant", value: Chaos.powerCrescendo.adaptiveForce[stack] }
            }]
        })
    },
    // オーバーウォッチ: 自己バフ、クールダウン減少。合計クールダウン減少がしきい値（40%）を超えると
    // 追加で適合能力値を得る（`overwatchThresholdMet`参照）
    "augment.overwatch": {
        origin: "augment",
        nameIntlID: "Trait/Name/7310301",
        maxStack: 1,
        buff: stack => ({
            cooldownReduction: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7310301",
                value: { type: "constant", value: Chaos.overwatch.status.cooldownReduction * stack }
            }],
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7310301",
                value: { type: "constant", value: (stack != 0 && overwatchThresholdMet(status)) ? Chaos.overwatch.additionalStatus.adaptiveForce : 0 }
            }]
        })
    },
    // R_echarger: 自己バフ、究極技クールダウン減少
    "augment.r-echarger-cooldown": {
        origin: "augment",
        nameIntlID: "Trait/Name/7310501",
        maxStack: 1,
        buff: stack => ({
            ultCooldownReduction: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7310501",
                value: { type: "constant", value: Chaos.r_echarger.effect.ultCooldownReduction * stack }
            }]
        })
    },
    // R_echarger: 別の自己バフ、適合能力値増加（レベル依存）。本来はR使用後一定時間のみ有効なバフだが、
    // 他の一時条件付きバフ同様、発動中を仮定したON/OFFとして登録する
    "augment.r-echarger-adaptive-force": {
        origin: "augment",
        nameIntlID: "Trait/Name/7310501",
        maxStack: 1,
        buff: stack => ({
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7310501",
                value: { type: "constant", value: (Chaos.r_echarger.rActivateBuff.adaptiveForce.base + Chaos.r_echarger.rActivateBuff.adaptiveForce.level * config.level) * stack }
            }]
        })
    },
    // 極上のコレクション: 装備の等級（英雄<伝説<神話）に応じた累積ボーナス。ユーザーが選択するのはこの特性
    // 自体のON/OFFのみで、しきい値の判定はすべて`config.equipment`の実際の装備構成から自動的に行う
    // （`celestialCollectionCounts`参照）。しきい値未達のキーは値0の`StatusValueComponent`を返すのではなく
    // キーごと結果オブジェクトから除外する（`effectsOf()`は`buff()`が返すキーの数だけ表示行を作るため、
    // 常に7項目すべてを含めると英雄装備だけの段階でも0%の行が大量に並んでしまう。`stack == 0`のとき空
    // オブジェクトを返すのも同じ理由）
    "augment.celestial-collection": {
        origin: "augment",
        nameIntlID: "Trait/Name/7310701",
        maxStack: 1,
        buff: stack => {
            if (stack == 0) return {};

            const { heroicOrAbove, legendaryOrAbove, mythic } = celestialCollectionCounts(config);
            const legendary = Chaos.celestialCollection.legendary;
            const mythicTier = Chaos.celestialCollection.mythic;

            const component = (value: Decimal.Value, calculationType: "sum" | "mul" = "sum"): StatusValueComponent => ({
                origin: "temporary-status",
                calculationType,
                intlID: "Trait/Name/7310701",
                value: { type: "constant", value }
            });

            const adaptiveForce = [
                ...(heroicOrAbove >= 5 ? [component(Chaos.celestialCollection.heroic[5].adaptiveForce)] : []),
                ...(legendaryOrAbove >= 1 ? [component(legendary[1].adaptiveForce)] : [])
            ];

            return {
                ...(adaptiveForce.length > 0 ? { adaptiveForce } : {}),
                ...(legendaryOrAbove >= 2 ? { defense: [component(legendary[2].defense)] } : {}),
                ...(legendaryOrAbove >= 3 ? { maxHp: [component(legendary[3].maxHP)] } : {}),
                ...(legendaryOrAbove >= 4 ? { moveSpeed: [component(legendary[4].movementSpeed, "mul")] } : {}),
                ...(legendaryOrAbove >= 5 ? { penetrationDefenseRatio: [component(legendary[5].penetrationDefenseRatio)] } : {}),
                ...(mythic >= 1 ? { lifeSteal: [component(mythicTier[1].lifeSteal)] } : {}),
                ...(mythic >= 2 ? { tenacity: [component(mythicTier[2].tenacity)] } : {})
            };
        }
    }
});

/**
 * カオス系特性（`chaos.ts`）が他者（味方・敵）に与えるバフ・デバフの定義（`origin: "augment"`）。
 * `buff-debuff.ts`の`AugmentGivenBuffDebuff`から集約される
 */
export const ChaosGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 鬼火: 対象が受ける治癒効果減少デバフ
    "augment.ghost-light": {
        origin: "augment",
        nameIntlID: "Trait/Name/7300201",
        maxStack: 1,
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7300201",
                value: { type: "constant", value: Chaos.ghostLight.healingReduction * stack }
            }]
        })
    }
};
