import Constants from "./constants";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// ピコピコハンマー！(W) の味方への移動速度増加は、レニ自身のステータス（スキル増幅）に依存するため、
// 他者バフカタログ（givenBuffDebuff、発生源のconfigを持たない）側では正確な値を算出できない
// （ヨハンEの導きの光と同様の事情）。1%刻みの自由選択とし、選択範囲は、Lv1時点でのbase値（12%）を
// 最小値、理想的なサポート装備が揃った場合の効果量（34%）を少量上回る40%を最大値とする
// （stack 1が12%、stack 29が40%に対応）
export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // ピコピコハンマー！(W) 味方への短時間の移動速度減少
    "subject.leni.w-ally-slow": {
        origin: "skill",
        nameIntlID: "subject.leni.w-ally-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1069320",
                value: {
                    type: "constant",
                    value: Constants.W.ally_slow.effect * -1 * stack
                }
            }]
        })
    },
    // ピコピコハンマー！(W) 味方への移動速度増加（1%刻み・12〜40%の自由選択）
    "subject.leni.w-ally-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.leni.w-ally-movement-speed",
        maxStack: 29,
        stackLabels: [
            "buff-debuff.common.none",
            ...Array.from({ length: 29 }, (_, i) => `buff-debuff.common.percent.${12 + i}`)
        ],
        excludeNoneOption: true,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1069330",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : 11 + stack
                }
            }]
        })
    }
};

// ピコピコハンマー！(W、内側/外側命中)・スプリングトラップ！(R)の移動速度減少は汎用デバフ
// （buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.leni.w-slow-center", values: [Constants.W.slow.center] },
    { nameIntlID: "subject.leni.w-slow-outer", values: [Constants.W.slow.outer] },
    { nameIntlID: "subject.leni.r-slow", values: [Constants.R.slow.effect] }
];
