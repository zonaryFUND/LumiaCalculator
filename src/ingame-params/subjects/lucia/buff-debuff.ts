import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 令嬢の嗜み(T) 水晶消費時の自己移動速度増加
    "subject.lucia.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.lucia.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1090110",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    },
    // 令嬢の嗜み(T) 水晶付与対象への基本攻撃時の自己攻撃速度増加
    "subject.lucia.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.lucia.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "subject.lucia.t-attack-speed",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed * stack
                }
            }]
        })
    }
});

// 輝くロマン(強化Q)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.lucia.q-enhanced-slow", values: [Constants.Q.slow.effect] }
];
