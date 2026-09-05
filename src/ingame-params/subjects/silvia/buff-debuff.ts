import Constants from "./constants";
import { SubjectModules, SubjectSelfBuffDebuff } from "../type";
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

// 能動的に近接（バイク）/遠隔（人間）モードを切り替える変身型実験体。武器未装備の場合は現在のモードに
// よらず近接扱いになる（ゲーム内検証済み）。武器装備中は"subject.silvia.r-mode"の現在のスタック
// （1=人間/2=バイク。excludeNoneOptionのため0は取らない想定だが念のためデフォルト1＝人間として扱う）で判定
export const weaponRangeOverride: SubjectModules["weaponRangeOverride"] = config => {
    if (config.equipment.Weapon == null) return "melee";
    const mode = config.selfBuffs.find(s => s.id == "subject.silvia.r-mode")?.stack ?? 1;
    return mode == 2 ? "melee" : "range";
};
