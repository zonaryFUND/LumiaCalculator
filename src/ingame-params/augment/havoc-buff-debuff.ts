import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { CommonPercentLabels, CommonStackLabels } from "@app/ingame-params/buff-debuff/util";
import { SubjectConfig, weaponRangeOf } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import Havoc from "./havoc";

// 特性「劣勢克服」のスタック刻み（％）。本来は自身の最大体力に対する対象の最大体力超過割合に応じて
// 連続的に変化する効果（`Havoc.dismantleGoliath`のmin/max/multiplier参照）だが、シンプルモードには
// 「対象の最大体力」を判別する仕組みがないため、暫定的に2.5%刻み・0〜10%の選択式自己バフとして実装する
// （対戦モードでの本来の計算式への対応は将来の課題。`augment/CHECKLIST.md`参照）
const DismantleGoliathStep = 2.5;
const DismantleGoliathMaxStack = 4;

// 特性「狂奔」の生命力吸収増加量を、自身の現在体力割合（`currentHPRatio`。`SubjectPerpetualStatus`・
// `EquipmentAbilityPerpetualStatus`と同様、statusOf()から素通しされる実際の値）から算出する
function frenzyLifeSteal(currentHPRatio: number): number {
    const { minHp, minEffect, maxHP, maxEffect } = Havoc.frenzy;

    if (currentHPRatio >= minHp) return 0;
    if (currentHPRatio <= maxHP) return maxEffect;
    return minEffect + (minHp - currentHPRatio) / (minHp - maxHP) * (maxEffect - minEffect);
}

// 狩猟系4特性（熊/イノシシ/オオカミ/ハウンド）共通のスタック選択肢。「無効」・0・10・20・…・80スタックの
// 10択（`maxStack: 9`。stackLabelsは`maxStack + 1`＝10要素）。「無効」（index 0）は、特性選択時点で常時
// 得られる`base`ステータスすら一時的に無効化する、バフ欄からの削除とは別の利便性オプション（ユーザー要望）
const HuntingMaskMaxStack = 9;
const HuntingMaskStackLabels = ["buff-debuff.common.none", ...CommonStackLabels(80, 10)];

/**
 * 狩猟系特性の効果量を選択肢のindex（0="無効"、1="0スタック"、2="10スタック"、…、9="80スタック"）から
 * 算出する。「無効」（index 0）は`base`（特性選択だけで得られる基礎ステータス）ごと0にする。
 * 「0スタック」（index 1）は`base`のみ有効（狩猟スタックによる追加効果はまだ0）。以降1段階（index+1）で
 * 狩猟スタック10単位分（`per`）の`effect`を積み増す
 */
function huntingMaskValue(base: number, effect: number, index: number): number {
    const selected = index >= 1 ? 1 : 0;
    const units = Math.max(index - 1, 0);
    return (base + effect * units) * selected;
}

/**
 * 破壊系特性（`havoc.ts`）由来の選択式自己バフ（`origin: "augment"`）。`buff-debuff.ts`の`AugmentBuffDebuff`
 * から集約される。id命名は他の選択式カタログ（`item-skill.*`）に倣い`augment.<特性名>`とする
 */
export const HavocBuffDebuff = (config: SubjectConfig, _status: Status, currentHPRatio: number): Record<string, BuffDebuffDefinition> => ({
    // 吸血鬼: スタックごとに適合能力値・生命力吸収（近接/遠隔で効果量が異なる）が増加し、最大スタック時のみ
    // 追加で適合能力値を得る
    "augment.vampiric-bloodline": {
        origin: "augment",
        nameIntlID: "Trait/Name/7000401",
        maxStack: Havoc.vampiricBloodline.maxStack,
        buff: stack => {
            const lifeStealPerStack = weaponRangeOf(config) == "melee" ?
                Havoc.vampiricBloodline.stack.lifeSteal.melee : Havoc.vampiricBloodline.stack.lifeSteal.range;
            const maxStackAdaptiveForce = Havoc.vampiricBloodline.maxAdditionalStatus.adaptiveForce.base +
                Havoc.vampiricBloodline.maxAdditionalStatus.adaptiveForce.level * config.level;

            return {
                adaptiveForce: [
                    {
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "Trait/Name/7000401",
                        value: { type: "constant", value: Havoc.vampiricBloodline.stack.adaptiveForce * stack }
                    },
                    {
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "Trait/Name/7000401",
                        value: { type: "constant", value: stack == Havoc.vampiricBloodline.maxStack ? maxStackAdaptiveForce : 0 }
                    }
                ],
                lifeSteal: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "Trait/Name/7000401",
                    value: { type: "constant", value: lifeStealPerStack * stack }
                }]
            };
        }
    },
    // アドレナリン: スタックごとに攻撃速度（近接/遠隔・レベルで効果量が異なる）が増加し、最大スタック時のみ
    // 追加で攻撃速度・移動速度を得る。最大スタック時の攻撃速度は本来「攻撃速度上限無視」だが、この計算機の
    // 攻撃速度上限（2.5倍固定、`calculation.ts`参照）はバフ側から上書きする仕組みを持たないため反映できていない
    // （`augment/CHECKLIST.md`参照）
    "augment.adrenaline": {
        origin: "augment",
        nameIntlID: "Trait/Name/7000601",
        maxStack: Havoc.adrenaline.maxStack,
        buff: stack => {
            const range = weaponRangeOf(config);
            const perStack = Havoc.adrenaline.stack.attackSpeed[range];
            const maxAdditional = Havoc.adrenaline.maxAdditionalStatus.attackSpeed[range];
            const isMaxStack = stack == Havoc.adrenaline.maxStack;

            return {
                attackSpeed: [
                    {
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "Trait/Name/7000601",
                        value: { type: "constant", value: (perStack.base + perStack.level * config.level) * stack }
                    },
                    {
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "Trait/Name/7000601",
                        value: { type: "constant", value: isMaxStack ? maxAdditional.base + maxAdditional.level * config.level : 0 }
                    }
                ],
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "Trait/Name/7000601",
                    value: { type: "constant", value: isMaxStack ? Havoc.adrenaline.maxAdditionalStatus.movementSpeed : 0 }
                }]
            };
        }
    },
    // アクセルレート: 自己バフ、攻撃速度増加（固定値、チェックボックス型）
    "augment.accelerator": {
        origin: "augment",
        nameIntlID: "Trait/Name/7000701",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7000701",
                value: { type: "constant", value: Havoc.accelerator.attackSpeed * stack }
            }]
        })
    },
    // 劣勢克服: 本来の発動条件（対象の最大体力超過割合）を判別できないため、`increaseDamageRatio`
    // （与えるダメージ増加、docs/known-issues.md参照）へのスタック可変（2.5%刻み、0〜10%）の選択式自己バフ
    // として暫定実装する
    "augment.dismantle-goliath": {
        origin: "augment",
        nameIntlID: "Trait/Name/7010501",
        maxStack: DismantleGoliathMaxStack,
        stackLabels: CommonPercentLabels(DismantleGoliathStep * DismantleGoliathMaxStack, DismantleGoliathStep),
        buff: stack => ({
            increaseDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7010501",
                value: { type: "constant", value: DismantleGoliathStep * stack }
            }]
        })
    },
    // 狂奔: 自身の現在体力割合に応じて生命力吸収が増加（`frenzyLifeSteal`参照）。ON/OFFの選択式自己バフだが、
    // ONのときの効果量は選択中の`currentHPRatio`（体力スライダー）に応じて自動的に変化する
    "augment.frenzy": {
        origin: "augment",
        nameIntlID: "Trait/Name/7010901",
        maxStack: 1,
        buff: stack => ({
            lifeSteal: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7010901",
                value: { type: "constant", value: frenzyLifeSteal(currentHPRatio) * stack }
            }]
        })
    },
    // 弱者蔑視: 本来は対象の残り体力割合が閾値以下で自動発動する効果（`brute_enforcer`と同様、対戦モードでの
    // 対象体力に応じた自動判定は将来の課題）だが、シンプルモードには仮想敵の概念がないため、
    // 単純なON/OFFの自己バフとして`increaseDamageRatio`に登録する
    "augment.contempt-for-the-weak": {
        origin: "augment",
        nameIntlID: "Trait/Name/7011001",
        maxStack: 1,
        buff: stack => ({
            increaseDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7011001",
                value: { type: "constant", value: Havoc.contemptForTheWeak.effect * stack }
            }]
        })
    },
    // 狩猟 - 熊: 適合能力値
    "augment.bear-mask": {
        origin: "augment",
        nameIntlID: "Trait/Name/7011101",
        maxStack: HuntingMaskMaxStack,
        stackLabels: HuntingMaskStackLabels,
        buff: index => ({
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7011101",
                value: { type: "constant", value: huntingMaskValue(Havoc.bearMask.base.adaptiveForce, Havoc.bearMask.stackBuff.effect.adaptiveForce, index) }
            }]
        })
    },
    // 狩猟 - イノシシ: 最大体力
    "augment.boar-mask": {
        origin: "augment",
        nameIntlID: "Trait/Name/7011201",
        maxStack: HuntingMaskMaxStack,
        stackLabels: HuntingMaskStackLabels,
        buff: index => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7011201",
                value: { type: "constant", value: huntingMaskValue(Havoc.boarMask.base.maxHP, Havoc.boarMask.stackBuff.effect.maxHP, index) }
            }]
        })
    },
    // 狩猟 - オオカミ: 攻撃速度
    "augment.wolf-mask": {
        origin: "augment",
        nameIntlID: "Trait/Name/7011301",
        maxStack: HuntingMaskMaxStack,
        stackLabels: HuntingMaskStackLabels,
        buff: index => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7011301",
                value: { type: "constant", value: huntingMaskValue(Havoc.wolfMask.base.attackSpeed, Havoc.wolfMask.stackBuff.effect.attackSpeed, index) }
            }]
        })
    },
    // 狩猟 - ハウンド: 生命力吸収
    "augment.wild-dog-mask": {
        origin: "augment",
        nameIntlID: "Trait/Name/7011401",
        maxStack: HuntingMaskMaxStack,
        stackLabels: HuntingMaskStackLabels,
        buff: index => ({
            lifeSteal: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7011401",
                value: { type: "constant", value: huntingMaskValue(Havoc.wildDogMask.base.lifeSteal, Havoc.wildDogMask.stackBuff.effect.lifeSteal, index) }
            }]
        })
    }
});

/**
 * 破壊系特性（`havoc.ts`）が他者（味方・敵）に与えるバフ・デバフの定義（`origin: "augment"`）。
 * `buff-debuff.ts`の`AugmentGivenBuffDebuff`から集約される
 */
export const HavocGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 絶対武力: 発動条件（3回攻撃的中）を満たした対象への防御力減少デバフ
    "augment.frailty-infliction": {
        origin: "augment",
        nameIntlID: "Trait/Name/7000201",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7000201",
                value: { type: "constant", value: Havoc.frailtyInfliction.defenseReduction.effect * -1 * stack }
            }]
        })
    },
    // 傷跡: 最大2スタックする、対象が受ける治癒効果減少デバフ
    "augment.cicatrix": {
        origin: "augment",
        nameIntlID: "Trait/Name/7011501",
        maxStack: Havoc.cicatrix.maxStack,
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7011501",
                value: { type: "constant", value: Havoc.cicatrix.healingReduction * stack }
            }]
        })
    }
};
