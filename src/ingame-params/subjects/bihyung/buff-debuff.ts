import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 天罰！(W) 自身に命中したときの移動速度増加
    "subject.bihyung.w-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.bihyung.w-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1088320",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed.effect * stack
                }
            }]
        })
    },
    // 宴の始まりだ！(R) 飛び上がり中の被ダメージ減少
    "subject.bihyung.r-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.bihyung.r-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1088500",
                value: {
                    type: "constant",
                    value: Constants.R.damage_reduction * stack
                }
            }]
        })
    },
    // 宴の始まりだ！(R) 効果時間中の最大体力増加
    "subject.bihyung.r-max-hp": {
        origin: "skill",
        nameIntlID: "subject.bihyung.r-max-hp",
        maxStack: 1,
        buff: stack => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1088540",
                value: {
                    type: "constant",
                    value: Constants.R.additional_max_hp.base[config.skillLevels.R] * stack
                }
            }]
        })
    },
    // トッケビ火(T) 移動速度減少耐性増加
    "subject.bihyung.t-slow-resistance": {
        origin: "skill",
        nameIntlID: "subject.bihyung.t-slow-resistance",
        maxStack: 1,
        buff: stack => ({
            slowResist: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1088120",
                value: {
                    type: "constant",
                    value: Constants.T.slow_resistance[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// W的中対象・R的中対象の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。
// Rのスロウは範囲外側（Constants.R.slow.effect）と中央（外側の値をConstants.R.center_amp%分増加させた値）
// で効果量が異なる
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.bihyung.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.bihyung.r-slow-outer", values: [Constants.R.slow.effect] },
    { nameIntlID: "subject.bihyung.r-slow-center", values: [Constants.R.slow.effect * (1 + Constants.R.center_amp / 100)] }
];
