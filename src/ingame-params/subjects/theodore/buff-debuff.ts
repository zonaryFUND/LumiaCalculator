import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // チャージ中の自己移動速度減少
    "subject.theodore.q-self-slow": {
        origin: "skill",
        nameIntlID: "subject.theodore.q-self-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "subject.theodore.q-self-slow",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed_penalty * -1 * stack
                }
            }]
        })
    },
    // Q/E的中後の自己基本攻撃射程増加
    "subject.theodore.e-range": {
        origin: "skill",
        nameIntlID: "subject.theodore.e-range",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1062040",
                value: {
                    type: "constant",
                    value: Constants.E.range_increase * stack
                }
            }]
        })
    },
    // エネルギーフィールド(R) ハイパーチャージ状態中の自己攻撃速度増加
    "subject.theodore.r-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.theodore.r-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1062500",
                value: {
                    type: "constant",
                    value: Constants.R.attack_speed[config.skillLevels.R] * stack
                }
            }]
        })
    },
    // エネルギー・プロトコル(T) 隠密効果中の自己移動速度増加
    "subject.theodore.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.theodore.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1062010",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// エネルギーフィールド(R)上を同じ方向に移動する味方への移動速度増加は、テオドール自身のスキル増幅に
// 依存するため、他者バフカタログ（givenBuffDebuff、発生源のconfigを持たない）側では正確な値を算出できない
// （ヨハンE・レニWと同様の事情）。1%刻みではなくユーザー指定により5%刻みの自由選択とし、選択範囲は
// Lv1時点でのbase値（50%）を最小値、テオドールは装備の自由度が低くほぼ確定する理想ビルド時の効果量を
// 少量上回る120%を最大値とする（stack 1が50%、stack 15が120%に対応）
export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    "subject.theodore.r-ally-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.theodore.r-ally-movement-speed",
        maxStack: 15,
        stackLabels: [
            "buff-debuff.common.none",
            ...Array.from({ length: 15 }, (_, i) => `buff-debuff.common.percent.${50 + i * 5}`)
        ],
        excludeNoneOption: true,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1062510",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : 45 + stack * 5
                }
            }]
        })
    }
};

// スパーク弾(E)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.theodore.e-slow", values: Constants.E.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
