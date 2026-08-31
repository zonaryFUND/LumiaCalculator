import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { calculateValue } from "core/value-ratio";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // T（スターゲイザー状態）の移動速度増加。効果量がスキル増幅（ステータス）を参照するため、
    // 他の実験体の自己バフのように定数を直接書けず`calculateValue()`で解決する
    const movementSpeed = calculateValue(Constants.T.movement_speed, status, config, "T");

    return {
        "subject.adina.t-movement-speed-buff": {
            origin: "skill",
            nameIntlID: "subject.adina.passive-movement-speed-buff",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1052100",
                    value: {
                        type: "constant",
                        value: movementSpeed.static.toNumber() * stack
                    }
                }]
            })
        }
    };
};

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 星Qの軌跡（ルミナリー星）による、他者（味方）への移動速度増加
    "subject.adina.q-star-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.adina.q-star-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1052210",
                value: {
                    type: "constant",
                    value: Constants.Q.star.movement_speed * stack
                }
            }]
        })
    }
};

// Wの移動速度減少（通常・月コンジャンクション強化版の2種、効果量が別）は汎用デバフ（generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.adina.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.adina.w-moon-conjunction-slow", values: [Constants.W.conjunction.slow.effect] }
];
