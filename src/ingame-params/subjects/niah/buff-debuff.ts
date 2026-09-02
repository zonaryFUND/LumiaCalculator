import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { calculateValue } from "core/value-ratio";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // 1UP(E) 発動時の自己移動速度増加はスキル増幅に比例するレシオのため、calculateValue()で解決する
    const eMovementSpeed = calculateValue(Constants.E.movement_speed.effect, status, config, "E");

    return {
        "subject.niah.e-movement-speed": {
            origin: "skill",
            nameIntlID: "subject.niah.e-movement-speed",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1081420",
                    value: {
                        type: "constant",
                        value: eMovementSpeed.static.toNumber() * stack
                    }
                }]
            })
        }
    };
};

// アーケードドロップ(W範囲内へ引き寄せられたQ)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.niah.q-pull-slow", values: [Constants.Q.slow.effect] }
];
