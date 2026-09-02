import Constants from "./constants";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// 導きの光(E)は、効果付与対象への移動速度増加と、効果対象へ向かう際の（自身を含む）別の味方への
// 移動速度増加という、2種類の別々の移動速度増加効果を持つ。いずれもヨハン自身のステータス（スキル増幅）に
// 依存するため、他者バフカタログ（givenBuffDebuff、発生源のconfigを持たない）側では正確な値を算出できない。
// 簡略化のため2種類を「ヨハンEによる移動速度増加」1項目に統合し、1%刻みの自由選択とする。
// 選択範囲は、2種類の効果のLv1時点でのbase値（movement_speed.effect.base[0]=6、
// chase_movement_speed.base[0]=5）のうち低い方（5%）を最小値、理想的なサポート装備が揃った場合の
// 効果量を少量上回る30%を最大値とする（stack 1が5%、stack 26が30%に対応）
export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 神性の香炉(W) 範囲内の味方への攻撃速度増加
    "subject.johann.w-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.johann.w-attack-speed",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1041300",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.W.attack_speed[stack - 1]
                }
            }]
        })
    },
    // 導きの光(E) 移動速度増加（対象への付与・対象へ向かう味方への付与を統合、1%刻み・5〜30%の自由選択）
    "subject.johann.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.johann.e-movement-speed",
        maxStack: 26,
        stackLabels: [
            "buff-debuff.common.none",
            ...Array.from({ length: 26 }, (_, i) => `buff-debuff.common.percent.${5 + i}`)
        ],
        excludeNoneOption: true,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1041410",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : 4 + stack
                }
            }]
        })
    },
    // 救援の聖域(R) 発動中の自己/味方防御力増加
    "subject.johann.r-defense": {
        origin: "skill",
        nameIntlID: "subject.johann.r-defense",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1041510",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.R.defense[stack - 1]
                }
            }]
        })
    },
    // 光の加護(T) 回復・シールドを与えた味方への妨害耐性増加
    "subject.johann.t-tenacity": {
        origin: "skill",
        nameIntlID: "subject.johann.t-tenacity",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            tenacity: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1041110",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.T.tenacity_ally.effect[stack - 1]
                }
            }]
        })
    }
};

// 神性の香炉(W)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.johann.w-slow", values: Constants.W.slow, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
