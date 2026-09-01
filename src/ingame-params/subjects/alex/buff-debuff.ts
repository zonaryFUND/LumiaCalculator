import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// アレックスは戦闘中に近接・遠隔武器を能動的に持ち替えられるため、現在の装備武器に関わらず近接・遠隔
// 双方のスキルによる自己バフを同時に保持しうる。そのため装備武器による出し分けは行わない
export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => {
    return {
        // 奇襲(近接Q) 的中対象1体につき攻撃力増加（最大2スタック）
        "subject.alex.melee-q-attack-power": {
            origin: "skill",
            nameIntlID: "subject.alex.melee-q-attack-power",
            maxStack: Constants.MeleeQ.attack_up.max_stack,
            buff: stack => ({
                attackPower: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1027210",
                    value: {
                        type: "constant",
                        value: Constants.MeleeQ.attack_up.effect * stack
                    }
                }]
            })
        },
        // コイルガン(遠隔Q) 的中対象1体につき攻撃力増加（最大2スタック）
        "subject.alex.range-q-attack-power": {
            origin: "skill",
            nameIntlID: "subject.alex.range-q-attack-power",
            maxStack: Constants.RangeQ.attack_up.max_stack,
            buff: stack => ({
                attackPower: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1027200",
                    value: {
                        type: "constant",
                        value: Constants.RangeQ.attack_up.effect * stack
                    }
                }]
            })
        },
        // ターゲットマーカー(遠隔W) 的中時自己射程距離増加
        "subject.alex.range-w-attack-range": {
            origin: "skill",
            nameIntlID: "subject.alex.range-w-attack-range",
            maxStack: 1,
            buff: stack => ({
                attackRange: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1027300",
                    value: {
                        type: "constant",
                        value: Constants.RangeW.range * stack
                    }
                }]
            })
        },
        // コイルガンと奇襲(Q) 近接Q・遠隔Qを両方最大スタック獲得時の攻撃速度増加。ゲーム内では両バフの状態から
        // 自動的に導出されるが、計算機側では導出バフを未実装のため、独立してON/OFFできる自己バフとして扱う
        "subject.alex.q-max-stack-attack-speed": {
            origin: "skill",
            nameIntlID: "subject.alex.q-max-stack-attack-speed",
            maxStack: 1,
            buff: stack => ({
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1027220",
                    value: {
                        type: "constant",
                        value: Constants.common.q_stack_max_as * stack
                    }
                }]
            })
        },
        // 潜入(T) 発動時の移動速度増加
        "subject.alex.t-hide-movement-speed": {
            origin: "skill",
            nameIntlID: "subject.alex.t-hide-movement-speed",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1027120",
                    value: {
                        type: "constant",
                        value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                    }
                }]
            })
        }
    };
};

// 遠隔E・Rの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示
// 専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.alex.rangee-slow", values: Constants.RangeE.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.alex.r-first-slow", values: [Constants.R.first_slow.effect] },
    { nameIntlID: "subject.alex.r-later-slow", values: [Constants.R.later_slow.effect] }
];
