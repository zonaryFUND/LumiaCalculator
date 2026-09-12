import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonLevelLabels } from "@app/ingame-params/buff-debuff/util";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import Support from "./support";

// サポート系特性にスロウを持つものは存在しない
export const SupportSlowSources: SlowSourceInfo[] = [];

// 特性「威圧感」の被ダメージ増加量。1スタックごとの寄与は`base`から`effect_decline`%ずつ逓減する
// （1スタック目=base、2スタック目=base*(1-effect_decline%)、3スタック目=base*(1-2*effect_decline%)、…）
// ため、単純な`base * stack`ではなく各スタックの寄与を積算する
function powerOfIntimidationValue(stack: number): number {
    const { status, effect_decline } = Support.powerOfIntimidation;

    return Array.from({ length: stack }, (_, i) => status.increaseDamagedRatio * (1 - effect_decline / 100 * i))
        .reduce((sum, value) => sum + value, 0);
}

/**
 * サポート系特性（`support.ts`）由来の選択式自己バフ（`origin: "augment"`）。`buff-debuff.ts`の
 * `AugmentBuffDebuff`から集約される
 */
export const SupportBuffDebuff = (_config: SubjectConfig, _status: Status, _currentHPRatio: number): Record<string, BuffDebuffDefinition> => ({
    // 狩りの戦慄: 自己バフ、移動速度増加（固定値）
    "augment.thrill-of-the-hant": {
        origin: "augment",
        nameIntlID: "Trait/Name/7211001",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7211001",
                value: { type: "constant", value: Support.thrillOfTheHant.status.movementSpeed * stack }
            }]
        })
    },
    // 超再生: 自己バフ、与えるシールド・回復量増加（固定値）
    "augment.healing-factor": {
        origin: "augment",
        nameIntlID: "Trait/Name/7200101",
        maxStack: 1,
        buff: stack => ({
            healerGiveHealShieldRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7200101",
                value: { type: "constant", value: Support.healingFactor.status.healerGiveHealShieldRatio * stack }
            }]
        })
    },
    // キャンピングガイド: 自己バフ、移動速度増加（flat）
    "augment.camping-guide": {
        origin: "augment",
        nameIntlID: "Trait/Name/7110801",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7110801",
                value: { type: "constant", value: Support.campingGuide.movementSpeed.effect * stack }
            }]
        })
    }
});

/**
 * サポート系特性（`support.ts`）が他者（味方・敵）に与えるバフ・デバフの定義（`origin: "augment"`）。
 * `buff-debuff.ts`の`AugmentGivenBuffDebuff`から集約される。
 *
 * `amplificationDrone`の2つの効果は発生源（実験体）のレベルに依存するValueRatio（`{base, level}`）だが、
 * 他者バフ・デバフは受信側の計算機が発生源のconfigを保持していないため`config.level`を参照できない。
 * `tactical-skill/buff-debuff.ts`の「プロトコル違反」と同様、`stack`を発生源のレベル（1〜20、0=付与なし）
 * として使うことで表現する
 */
export const SupportGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // サボテン爆弾: 爆弾付着対象を攻撃した味方への移動速度バフ（固定値）
    "augment.blast-cactus": {
        origin: "augment",
        nameIntlID: "Trait/Name/7211301",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7211301",
                value: { type: "constant", value: Support.blastCactus.ally_movement_speed.effect * stack }
            }]
        })
    },
    // 増幅ドローン: 移動速度増加+与えるスキルダメージ増加（いずれも発生源のレベル依存）。ゲーム内では
    // 1つのバフが両方の効果を持つため、1エントリにまとめる。スキルダメージ増加はダメージ種別が
    // 「スキルダメージ」であれば発生源を問わず適用される「増幅ドローン型」
    // （`docs/damage-model.md`「スキルダメージ増加効果」）のため、発生源基準の`increaseSkillDamageRatio`
    // とは別枠の`increaseSkillTypeDamageRatio`に書き込む
    "augment.amplification-drone": {
        origin: "augment",
        nameIntlID: "Trait/Name/7200201",
        maxStack: 20,
        stackLabels: CommonLevelLabels(20),
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7200201",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Support.amplificationDrone.status.movementSpeed.base + Support.amplificationDrone.status.movementSpeed.level * stack
                }
            }],
            increaseSkillTypeDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7200201",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Support.amplificationDrone.status.skillDamageMultiplierRatio.base + Support.amplificationDrone.status.skillDamageMultiplierRatio.level * stack
                }
            }]
        })
    },
    // イバラの棘: 外向きデバフ、受ける治癒効果減少+被ダメージ増加（いずれも固定値）
    "augment.thorn-shackles": {
        origin: "augment",
        nameIntlID: "Trait/Name/7210101",
        maxStack: 1,
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7210101",
                value: { type: "constant", value: Support.thornShackles.status.hpHealedDecreaseRatio * stack }
            }],
            increaseDamagedRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7210101",
                value: { type: "constant", value: Support.thornShackles.status.increaseDamagedRatio * stack }
            }]
        })
    },
    // 威圧感: 外向きデバフ、被ダメージ増加。チーム内の複数人が持つとスタックしうる（最大3）が、
    // 1スタック追加につき効果が25%ずつ逓減する（`powerOfIntimidationValue`参照）
    "augment.power-of-intimidation": {
        origin: "augment",
        nameIntlID: "Trait/Name/7211401",
        maxStack: Support.powerOfIntimidation.max_stack,
        buff: stack => ({
            increaseDamagedRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7211401",
                value: { type: "constant", value: powerOfIntimidationValue(stack) }
            }]
        })
    }
};
