import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // イオンレーザー(W) 的中時自己移動速度増加
    "subject.barbara.w-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.barbara.w-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1026300",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed.effect * stack
                }
            }]
        })
    },
    // 超高出力イオンレーザー(RW) 的中時自己移動速度増加（Wと効果量が別）
    "subject.barbara.rw-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.barbara.rw-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1026310",
                value: {
                    type: "constant",
                    value: Constants.R.W.movement_speed.effect * stack
                }
            }]
        })
    },
    // 改造(T) 基本攻撃追加ダメージ発生効果中の攻撃速度増加
    "subject.barbara.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.barbara.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1026110",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed * stack
                }
            }]
        })
    }
});

// RE（磁力暴風地帯）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。
// RWの命中対象スロウはconstants.tsに効果量の記載がないため未実装（要確認）
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.barbara.re-slow", values: [Constants.R.E.slow] }
];
