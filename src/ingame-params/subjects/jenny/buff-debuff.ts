import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// ジェニーはペルソナ（赤ワイン/ブラックティー）を能動的に切り替えられる。計算機側はペルソナの状態を
// 保持していないため、ペルソナに応じた自己バフの出し分けは行わず、両ペルソナ分のバフを常にリストへ表示する
// （ブレアの双剣/両剣モードと同様の方針）
export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // スポットライト(Q、赤ワイン時) 自身に的中させたときの自己攻撃速度増加
    "subject.jenny.q-red-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.jenny.q-red-attack-speed",
        maxStack: Constants.Q.max_stack,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1038600",
                value: {
                    type: "constant",
                    value: Constants.Q.red_attack_speed * stack
                }
            }]
        })
    },
    // スポットライト(Q、ブラックティー時) 自身に的中させたときの自己移動速度増加
    "subject.jenny.q-black-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.jenny.q-black-movement-speed",
        maxStack: Constants.Q.max_stack,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1038200",
                value: {
                    type: "constant",
                    value: Constants.Q.black_movement_speed * stack
                }
            }]
        })
    },
    // 死の演技(T、赤ワイン切り替え時) 自己攻撃速度増加
    "subject.jenny.t-red-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.jenny.t-red-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1038160",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed[config.skillLevels.T] * stack
                }
            }]
        })
    },
    // 死の演技(T、ブラックティー切り替え時) 自己移動速度増加
    "subject.jenny.t-black-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.jenny.t-black-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1038150",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed * stack
                }
            }]
        })
    }
});

// レッドカーペット(W)・アカデミー女王(R)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化する
// ため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.jenny.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.jenny.r-slow", values: Constants.R.slow, valueLabels: CommonSkillLevelLabelsMax5.slice(1, 4) }
];
