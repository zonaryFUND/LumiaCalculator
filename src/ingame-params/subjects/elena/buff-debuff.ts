import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // スパイラル(E) 氷床地帯上での自己防御力割合増加
    "subject.elena.e-defense": {
        origin: "skill",
        nameIntlID: "subject.elena.e-defense",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1050420",
                value: {
                    type: "constant",
                    value: Constants.E.defense[config.skillLevels.E] * stack
                }
            }]
        })
    }
});

// T（冷気）蓄積中の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.elena.t-slow", values: [Constants.T.slow] }
];
