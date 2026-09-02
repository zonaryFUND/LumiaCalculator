import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 祝福のリス(T、赤+青) 発動時の自己移動速度増加
    "subject.tia.t-rb-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.tia.t-rb-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1048310",
                value: {
                    type: "constant",
                    value: Constants.T.rb.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// ブラシストローク(Q、黄/赤/青/青中央部)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録
// しない。色ごとに効果量が異なるため、それぞれ別項目として登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.tia.q-yellow-slow", values: [Constants.Q.y.slow.effect] },
    { nameIntlID: "subject.tia.q-red-slow", values: [Constants.Q.r.slow.effect] },
    { nameIntlID: "subject.tia.q-blue-slow", values: [Constants.Q.b.slow.effect] },
    { nameIntlID: "subject.tia.q-blue-center-slow", values: [Constants.Q.b.center_slow.effect] }
];
