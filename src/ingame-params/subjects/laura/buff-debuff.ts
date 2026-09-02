import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // ネレアの教え(T) 基本攻撃強化時の自己攻撃速度増加
    "subject.laura.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.laura.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1047110",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed * stack
                }
            }]
        })
    }
});

// 予告状(W)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.laura.w-slow", values: Constants.W.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
