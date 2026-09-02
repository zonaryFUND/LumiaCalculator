import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 空色の風(W1) 効果中の自己移動速度増加
    "subject.vanya.w1-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.vanya.w1-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1064310",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed[config.skillLevels.W] * stack
                }
            }]
        })
    }
});

// 追飛(E)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示
// 専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.vanya.e-slow", values: [Constants.E.slow.effect] }
];
