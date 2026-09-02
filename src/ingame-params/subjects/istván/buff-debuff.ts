import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 演算(T) もう一つの可能性発動時の自己移動速度増加
    "subject.istván.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.istván.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1080110",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 経路積分(E) 的中対象への防御力減少
    "subject.istván.e-defense-down": {
        origin: "skill",
        nameIntlID: "subject.istván.e-defense-down",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1080450",
                value: {
                    type: "constant",
                    value: Constants.E.defense_down.effect * -1 * stack
                }
            }]
        })
    }
};

// 観測(強化Q)・波動関数の収縮(R)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.istván.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.istván.r-slow", values: [Constants.R.slow.effect] }
];
