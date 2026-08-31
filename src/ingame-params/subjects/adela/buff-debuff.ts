import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => ({
    // Qスタックを3スタック獲得時の移動速度増加。トリガー自体はオン/オフ（maxStack:1）で、効果量が
    // Qのスキルレベル依存（Qのスタック機構自体とは別軸）
    "subject.adela.q-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.adela.q-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1024120",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed[config.skillLevels.Q] * stack
                }
            }]
        })
    }
});

// E経路上のナイト的中対象への移動速度減少は汎用デバフ（generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.adela.e-knight-slow", values: [Constants.E.knight.slow.effect] }
];
