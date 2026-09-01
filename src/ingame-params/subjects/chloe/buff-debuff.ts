import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// R効果時間中のニナ（召喚体）自己バフ（攻撃速度・移動速度増加）は未実装。ニナのステータス計算
// （nina.ts）は自己バフ/ComponentStatusの折りたたみ仕組みを一切通らないクロエStatusからの単純変換関数で、
// 対応にはSummonedStatusの拡張が必要となり複雑度に見合わないと判断（ユーザー確認済み）。また、ニナの
// 移動速度についてはゲーム内に算出方法の表記がなく、そもそも値が不明
export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 人形劇(W) 落ちた刃の刺繍拾得時の自己移動速度増加
    "subject.chloe.w-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.chloe.w-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1040330",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed.effect * stack
                }
            }]
        })
    }
});

// Q・W1（縫糸）・W2（刃の刺繍落下）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化する
// ため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.chloe.q-slow", values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.chloe.w1-slow", values: [Constants.W.slow] },
    { nameIntlID: "subject.chloe.w2-slow", values: Constants.W.drop_slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
