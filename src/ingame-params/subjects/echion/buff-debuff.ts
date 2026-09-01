import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";
import { weaponType } from "./weapon-type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // VF暴走(R) / オーバーロード(R) 共通効果。どちらもVFゲージが100%/0%に達した瞬間に発動する固定時間
    // （9秒/8秒）の状態であり、ゲージの現在値から連続的に導出されるものではないため、他の実験体の発動制
    // 一時状態と同様に切り替え式の自己バフとして扱う（「どちらでもない」通常状態が大半を占めるため、
    // excludeNoneOptionは使わない）
    "subject.echion.r-mode": {
        origin: "skill",
        nameIntlID: "subject.echion.r-mode",
        maxStack: 2,
        stackLabels: ["buff-debuff.common.none", "subject.echion.r-mode.overflow", "subject.echion.r-mode.overload"],
        buff: stack => {
            if (stack == 1) {
                return {
                    moveSpeed: [{
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "CharacterState/Group/Name/1044500",
                        value: {
                            type: "constant",
                            value: Constants.R.movement_speed
                        }
                    }]
                };
            }
            if (stack == 2) {
                return {
                    attackRange: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1044510",
                        value: {
                            type: "constant",
                            value: Constants.R.range_penalty * -1
                        }
                    }]
                };
            }
            return {};
        }
    },
    // デスアダー装備時のみ。デスアダー - 戦闘狂(T) 自己攻撃速度増加（最大4スタック）。1スタックあたりの
    // 効果量はTレベルではなくRレベル（1-4）に依存する（constants.tsコメント・t3.tsのツールチップと一致）
    ...(weaponType(config.equipment.Weapon) == "deathadder" ? {
        "subject.echion.t3-attack-speed": {
            origin: "skill",
            nameIntlID: "subject.echion.t3-attack-speed",
            maxStack: 4,
            buff: (stack: number) => ({
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1044110",
                    value: {
                        type: "constant",
                        value: Constants.R3.attack_speed[config.skillLevels.R] * stack
                    }
                }]
            })
        }
    } : {})
});

// Q（毒蛇の刃）・サイドワインダーR（エンベノミゼーション）の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない。slowSourcesは装備武器種に関わらず常に全件を宣言する
// （SubjectModules.slowSourcesはconfigを受け取れない静的な配列のため）
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.echion.q-slow", values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.echion.r1-slow", values: [Constants.R1.slow.effect] }
];
