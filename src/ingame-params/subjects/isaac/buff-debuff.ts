import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 搾取(T) 効果発動時の自己移動速度増加
    "subject.isaac.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.isaac.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1059140",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // アイザックE 的中対象への防御力減少
    "subject.isaac.e-defense-down": {
        origin: "skill",
        nameIntlID: "subject.isaac.e-defense-down",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1059430",
                value: {
                    type: "constant",
                    value: Constants.E.defense_down.effect * -1 * stack
                }
            }]
        })
    }
};

// アイザックRの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.isaac.r-slow", values: [Constants.R.slow] }
];
