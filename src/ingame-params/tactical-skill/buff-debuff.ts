import Constants from "./constants";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonLevelLabels, CommonSkillLevelLabelsMax5, CommonStackLabels } from "@app/ingame-params/buff-debuff/util";
import { SubjectConfig, weaponRangeOf } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { calculateValue } from "core/value-ratio";

/**
 * 特性「強い絆」の消費エネルギー選択肢から、実際のエネルギー量を算出する。index 0="無効"、
 * 1="0エネルギー"、2="10エネルギー"、…という10刻みの選択肢で、`maxEnergy`到達直前の刻みは
 * `maxEnergy`自体（例: Lv2は99エネルギーが上限のため、…80,90の次は100ではなく99）にクランプされる
 */
function soulStealerEnergy(maxEnergy: number, index: number): number {
    return Math.min((index - 1) * 10, maxEnergy);
}

/**
 * 戦術スキル由来の選択式自己バフ（`origin: "tactical-skill"`）。ユーザーが`self-buffs.tsx`の追加UIから
 * 任意に選択する（`selectable-self-buff-catalog.ts`参照）。
 *
 * 戦術スキルはUI上でレベル（Lv1/Lv2）を切り替える手段がないため、効果量がレベルに依存する場合は
 * `<skill>.lv1`/`<skill>.lv2`という2つの独立したエントリとして定義する（`damage-table.ts`のダメージ定義と
 * 同じ方針）。レベルに依存しない効果は単一エントリのまま
 */
export const TacticalSkillBuffDebuff = (config: SubjectConfig, status: Status): Record<string, BuffDebuffDefinition> => ({
    // ブリンク: Lv2のみ自己バフ、移動速度増加
    "tactical-skill.blink.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.blink.lv2",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4000000",
                value: { type: "constant", value: Constants.blink.movementSpeed.effect * stack }
            }]
        })
    },
    // 赤嵐: 自己バフ、基本攻撃射程増加（Lv1/Lv2で効果量が異なる）
    "tactical-skill.electric-shift.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.electric-shift.lv1",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4102000",
                value: { type: "constant", value: Constants.electric_shift.range[0] * stack }
            }]
        })
    },
    "tactical-skill.electric-shift.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.electric-shift.lv2",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4102000",
                value: { type: "constant", value: Constants.electric_shift.range[1] * stack }
            }]
        })
    },
    // 超越: Lv2のみ自己バフ、妨害耐性増加（追加最大体力比例のValueRatio）
    "tactical-skill.force-field.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.force-field.lv2",
        maxStack: 1,
        buff: stack => ({
            tenacity: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4103010",
                value: { type: "constant", value: calculateValue(Constants.forceField.tenacity, status, config, "tactical2").static.mul(stack) }
            }]
        })
    },
    // 無効化: 自己バフ、移動速度増加（Lv1/Lv2で効果量が異なる）
    "tactical-skill.nullification-movement-speed.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.nullification-movement-speed.lv1",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4105010",
                value: { type: "constant", value: Constants.nullification.movementSpeed[0] * stack }
            }]
        })
    },
    "tactical-skill.nullification-movement-speed.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.nullification-movement-speed.lv2",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4105010",
                value: { type: "constant", value: Constants.nullification.movementSpeed[1] * stack }
            }]
        })
    },
    // 無効化: デバフ効果解除時の追加移動速度増加（Lv1/Lv2共通、別バフとして実装）
    "tactical-skill.nullification.debuff-cleanse-bonus": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.nullification.debuff-cleanse-bonus",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4105000",
                value: { type: "constant", value: Constants.nullification.additionalMovementSpeed.effect * stack }
            }]
        })
    },
    // ストライダー - A13: 使用時（敵に向かって移動するとき）の移動速度増加
    "tactical-skill.the-strider.on-use": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.the-strider.on-use",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4114000",
                value: { type: "constant", value: Constants.theStrider.movementSpeed.effect * stack }
            }]
        })
    },
    // ストライダー - A13: 与ダメージ時の移動速度増加（近接/遠隔、Lv1/Lv2で効果量が異なる）。
    // Lv2のみのスロウは`TacticalSkillSlowSources`参照
    "tactical-skill.the-strider-after-attack.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.the-strider-after-attack.lv1",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4114020",
                value: {
                    type: "constant",
                    value: (weaponRangeOf(config) == "melee" ? Constants.theStrider.movementSpeedAfterAttack.effect.melee[0] : Constants.theStrider.movementSpeedAfterAttack.effect.range[0]) * stack
                }
            }]
        })
    },
    "tactical-skill.the-strider-after-attack.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.the-strider-after-attack.lv2",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4114020",
                value: {
                    type: "constant",
                    value: (weaponRangeOf(config) == "melee" ? Constants.theStrider.movementSpeedAfterAttack.effect.melee[1] : Constants.theStrider.movementSpeedAfterAttack.effect.range[1]) * stack
                }
            }]
        })
    },
    // 真実の刃: 自己移動速度増加。スキルレベル・ヒット数（1〜3、プルダウン）に応じて変化する
    "tactical-skill.blader-of-truth.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.blader-of-truth.lv1",
        maxStack: 3,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4112000",
                value: { type: "constant", value: stack == 0 ? 0 : Constants.bladerOfTruth.movementSpeed.base + Constants.bladerOfTruth.movementSpeed.perHit[0] * stack }
            }]
        })
    },
    "tactical-skill.blader-of-truth.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.blader-of-truth.lv2",
        maxStack: 3,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4112000",
                value: { type: "constant", value: stack == 0 ? 0 : Constants.bladerOfTruth.movementSpeed.base + Constants.bladerOfTruth.movementSpeed.perHit[1] * stack }
            }]
        })
    },
    // ライトウィング: 自己バフ、移動速度（レベル依存のValueRatio）+攻撃速度（固定値）増加
    "tactical-skill.wings-of-light.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.wings-of-light.lv1",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4118000",
                value: { type: "constant", value: calculateValue(Constants.wingsOfLight.movementSpeed, status, config, "tactical1").static.mul(stack) }
            }],
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4118000",
                value: { type: "constant", value: Constants.wingsOfLight.attackSpeed * stack }
            }]
        })
    },
    "tactical-skill.wings-of-light.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.wings-of-light.lv2",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4118000",
                value: { type: "constant", value: calculateValue(Constants.wingsOfLight.movementSpeed, status, config, "tactical2").static.mul(stack) }
            }],
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4118000",
                value: { type: "constant", value: Constants.wingsOfLight.attackSpeed * stack }
            }]
        })
    }
});

/**
 * 戦術スキルが他者（味方・敵。`SubjectConfig.incomingBuffs`のdocコメント参照）に与えるバフ・デバフの定義
 * （`origin: "tactical-skill"`）。`SubjectModules.givenBuffDebuff`・`WeaponSkillModule.givenBuffDebuff`と
 * 同様、受信側の計算機は発生源のconfigを保持していないため定数カタログとして定義する。戦術スキルは
 * サブディレクトリを持たない単一モジュールで、`weapon-skills/dictionary.ts`のようなglob集約は不要なため
 * `ingame-params/buff-debuff/incoming-catalog.ts`から直接importする
 *
 * サンプル: 「プロトコル違反」の命中時体力増加（ダメージは今回の実装対象外）。戦術スキルレベル（1/2）分は
 * 同種の定義を2つ用意することで表現し、発生源（実験体）のレベル依存分は`stack`（1..20 = レベルそのもの、
 * 0 = 付与なし）で表現する。`buff(stack)`はstack=0で必ず0になる規約（`ingame-params/README.md`参照）だが、
 * この効果の実式`base + level係数*レベル`はレベル0で自然にゼロにならないため、`stack == 0`のときだけ`0`を
 * 返す分岐を明示している
 */
export const TacticalSkillGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // プロトコル違反（戦術スキルLv1）
    // スタックラベルは発生源のレベルとする
    "tactical-skill.protocol-violation.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.protocol-violation.lv1",
        maxStack: 20,
        stackLabels: CommonLevelLabels(20),
        buff: stack => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4101010",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.protocol_violation.hpIncrease.base[0] + Constants.protocol_violation.hpIncrease.level[0] * stack
                }
            }]
        })
    },
    // プロトコル違反（戦術スキルLv2）
    // スタックラベルは発生源のレベルとする
    "tactical-skill.protocol-violation.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.protocol-violation.lv2",
        maxStack: 20,
        stackLabels: CommonLevelLabels(20),
        buff: stack => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4101010",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.protocol_violation.hpIncrease.base[1] + Constants.protocol_violation.hpIncrease.level[1] * stack
                }
            }]
        })
    },
    // 強い絆（戦術スキルLv1）: 外向き移動速度・ダメージ吸血バフ。事前にチャージしたエネルギー量
    // （0〜maxEnergy、10刻み）をスタックのプルダウンとして表現する（`soulStealerEnergy`参照）
    "tactical-skill.soul-stealer.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.soul-stealer.lv1",
        maxStack: Constants.soulStealer.maxEnergy[0] / 10 + 1,
        stackLabels: ["buff-debuff.common.none", ...CommonStackLabels(Constants.soulStealer.maxEnergy[0], 10)],
        buff: index => {
            const energy = soulStealerEnergy(Constants.soulStealer.maxEnergy[0], index);
            const selected = index >= 1 ? 1 : 0;

            return {
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/4107000",
                    value: { type: "constant", value: (Constants.soulStealer.movementSpeed.effect.base[0] + energy * Constants.soulStealer.movementSpeed.effect.energy) * selected }
                }],
                lifeSteal: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/4107010",
                    value: { type: "constant", value: (Constants.soulStealer.lifeSteal.base[0] + energy * Constants.soulStealer.lifeSteal.energy) * selected }
                }]
            };
        }
    },
    // 強い絆（戦術スキルLv2）。Lv2の最大エネルギーは99（10刻みの最後の段は100ではなく99にクランプ、
    // `soulStealerEnergy`参照）
    "tactical-skill.soul-stealer.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.soul-stealer.lv2",
        maxStack: 11,
        stackLabels: ["buff-debuff.common.none", ...CommonStackLabels(90, 10), "buff-debuff.common.stack.99"],
        buff: index => {
            const energy = soulStealerEnergy(Constants.soulStealer.maxEnergy[1], index);
            const selected = index >= 1 ? 1 : 0;

            return {
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/4107000",
                    value: { type: "constant", value: (Constants.soulStealer.movementSpeed.effect.base[1] + energy * Constants.soulStealer.movementSpeed.effect.energy) * selected }
                }],
                lifeSteal: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/4107010",
                    value: { type: "constant", value: (Constants.soulStealer.lifeSteal.base[1] + energy * Constants.soulStealer.lifeSteal.energy) * selected }
                }]
            };
        }
    },
    // 無効化: Lv2のみ、自分と周囲の味方が受け取る妨害耐性増加。効果量が自他で同一のため、
    // 自己バフ側には別途登録せずこの他者バフ側の定義のみとする（キャスター自身も必要ならここから追加する）
    "tactical-skill.nullification.ally-tenacity": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.nullification.ally-tenacity",
        maxStack: 1,
        buff: stack => ({
            tenacity: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4105020",
                value: { type: "constant", value: Constants.nullification.allyTenacity.effect * stack }
            }]
        })
    },
    // プラズマダッシュ: Lv2のみ、防御力低下デバフ（スロウは`TacticalSkillSlowSources`参照）
    "tactical-skill.plasma-dash.defense-down": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.plasma-dash.defense-down",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/4116000",
                value: { type: "constant", value: Constants.plasmaDash.defense_down.effect * -1 * stack }
            }]
        })
    }
};

/**
 * 戦術スキルのスロウ情報。実際のスロウ効果自体は個別実装せず汎用デバフ
 * （`ingame-params/buff-debuff/generic-slow.ts`）に一本化されるため、これは辞書UI表示専用の参照データ
 * （計算には一切関与しない。`buff-debuff/slow-dictionary.ts`に直接集約される）
 */
export const TacticalSkillSlowSources: SlowSourceInfo[] = [
    // クエイク: 使用時スロウ（Lv1/Lv2で効果量が異なる）
    { nameIntlID: "tactical-skill.quake.slow", values: Constants.quake.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1, 3) },
    // ストライダー - A13: Lv2のみ、与ダメージ時に対象へスロウ（近接/遠隔で効果量が異なる）
    {
        nameIntlID: "tactical-skill.the-strider.slow",
        values: [Constants.theStrider.slow.effect.melee, Constants.theStrider.slow.effect.range],
        valueLabels: ["buff-debuff.common.melee", "buff-debuff.common.range"]
    },
    // プラズマダッシュ: 使用時スロウ
    { nameIntlID: "tactical-skill.plasma-dash.slow", values: [Constants.plasmaDash.slow.effect] }
];
