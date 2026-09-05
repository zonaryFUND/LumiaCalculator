import Constants from "@app/ingame-params/equipment-abilities/healing_reduction/constants.json";
import { BuffDebuffDefinition } from "./type";

/**
 * 受ける治癒効果減少の汎用デバフ（`origin: "generic"`）。装備アビリティ「治癒減少」（`equipment-abilities/
 * healing_reduction`）を持つ装備は非常に多いため、発生源（装備）ごとに個別のカタログエントリを作らず
 * 「追加できるデバフ一覧」にこの2エントリだけを表示する（`generic-slow.ts`と同じ方針）。
 *
 * 効果量は装備の等級で変化する（英雄・伝説=20%、神話=30%。2026年頃のテコ入れパッチ後、しばらくして
 * 等級別に再調整された）ため、`healing_reduction/tooltip.ts`と同じ`Constants.effect`を等級ごとに参照し、
 * 2エントリに分けている。名称に「装備による」を含めているのは、実験体固有スキル・特性側にも比率の異なる
 * 治癒効果減少を持つものがあり、混同を避けるため
 */
export const GenericHealingReduction: Record<string, BuffDebuffDefinition> = {
    "generic.healing-reduction.epic-legend": {
        origin: "generic",
        nameIntlID: "generic.healing-reduction.epic-legend",
        maxStack: 1,
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "generic.healing-reduction.epic-legend",
                value: {
                    type: "constant",
                    value: Constants.effect.Epic * stack
                }
            }]
        })
    },
    "generic.healing-reduction.mythic": {
        origin: "generic",
        nameIntlID: "generic.healing-reduction.mythic",
        maxStack: 1,
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "generic.healing-reduction.mythic",
                value: {
                    type: "constant",
                    value: Constants.effect.Mythic * stack
                }
            }]
        })
    }
};
