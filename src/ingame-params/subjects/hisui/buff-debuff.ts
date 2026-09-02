import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 燕返し(R) 効果時間中の自己基本攻撃射程増加
    "subject.hisui.r-attack-range": {
        origin: "skill",
        nameIntlID: "subject.hisui.r-attack-range",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1078520",
                value: {
                    type: "constant",
                    value: Constants.R.range * stack
                }
            }]
        })
    },
    // 剣の記憶(T) スタック消化時の自己移動速度増加
    "subject.hisui.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.hisui.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1078160",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// Q（連撃斬）・R再使用1撃目（燕返し）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化する
// ため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.hisui.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.hisui.r2-slow", values: [Constants.R.slow.effect] }
];
