import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // 心の糧(T) 保持時の自己攻撃速度増加
    "subject.sua.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.sua.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1028100",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed * stack
                }
            }]
        })
    }
});

// オデッセイ(Q/RQ、中央的中時)・ドン・キホーテ(E/RE)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない。通常版と記憶力（R）強化版で効果量が異なるため、それぞれ別項目として
// 登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.sua.q-center-slow", values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.sua.rq-center-slow", values: Constants.RQ.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1, 4) },
    { nameIntlID: "subject.sua.e-slow", values: [Constants.E.slow.effect] },
    { nameIntlID: "subject.sua.re-slow", values: [Constants.RE.slow.effect] }
];
