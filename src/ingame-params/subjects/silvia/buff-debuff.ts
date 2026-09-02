import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// シルヴィアはRスキルで能動的に人間状態・バイク状態を切り替えられる（イレムの持続効果と異なり、
// プレイヤーが任意のタイミングで即座に切り替え可能）ため、切り替え式自己バフのプルダウンで表現する。
// 常にどちらかの状態にあり「どちらでもない」状態は存在しないため、excludeNoneOptionでスタック0
// （なし）を選択肢から除外する（ブレアの双剣/両剣モードと同様の方針）
export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    "subject.silvia.r-mode": {
        origin: "skill",
        nameIntlID: "subject.silvia.r-mode",
        maxStack: 2,
        stackLabels: ["buff-debuff.common.none", "subject.silvia.r-mode.human", "subject.silvia.r-mode.bike"],
        excludeNoneOption: true,
        buff: stack => {
            if (stack == 2) {
                return {
                    moveSpeed: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1016000",
                        value: {
                            type: "constant",
                            value: Constants.HumanR.movement_speed[config.skillLevels.R]
                        }
                    }],
                    defense: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1016000",
                        value: {
                            type: "constant",
                            value: Constants.HumanR.defense[config.skillLevels.R]
                        }
                    }]
                };
            }
            return {};
        }
    },
    // 機動戦(R) バイク搭乗直後の自己移動速度減少（Rレベルが上がるほどペナルティが小さくなり、最大時は0%）
    "subject.silvia.r-mount-slow": {
        origin: "skill",
        nameIntlID: "subject.silvia.r-mount-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1016050",
                value: {
                    type: "constant",
                    value: Constants.HumanR.ms_penalty.effect[config.skillLevels.R] * stack
                }
            }]
        })
    }
});

// フィニッシュライン(人間W)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.silvia.humanw-slow", values: [Constants.HumanW.slow.effect] }
];
