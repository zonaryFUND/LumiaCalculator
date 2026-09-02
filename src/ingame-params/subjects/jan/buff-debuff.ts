import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // クワドラゴン(R) キル関与時の自己移動速度増加
    "subject.jan.r-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.jan.r-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1035530",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed.effect * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 強化ニーストライク(強化Q1) 的中対象への防御力減少
    "subject.jan.q1-enhanced-defense-down": {
        origin: "skill",
        nameIntlID: "subject.jan.q1-enhanced-defense-down",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1035260",
                value: {
                    type: "constant",
                    value: Constants.Q.defense_reduction.effect * -1 * stack
                }
            }]
        })
    }
};

// ニーストライク(Q1)・クワドラゴン(R)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.jan.q1-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.jan.r-slow", values: [Constants.R.slow.effect] }
];
