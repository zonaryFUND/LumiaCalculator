import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Decimal from "decimal.js";

export const code = 1078300;

export function w3Count(asMultiplier: Decimal): number {
    return asMultiplier.div(35).floor().add(Constants.W.W3.count).clamp(0, Constants.W.W3.max_count).toNumber();
}

export const info: SkillTooltipProps = {
    skillKey: "W",
    values: ({ status, showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.W.W1.first_damage.base,
                1: RatioPercent(Constants.W.W1.first_damage.additionalAttack),
                2: Constants.W.W1.second_damage.base,
                3: RatioPercent(Constants.W.W1.second_damage.additionalAttack),
                4: RatioPercent(Constants.W.W1.second_damage.targetMaxHP),
                5: Constants.W.W1.shield.base,
                6: RatioPercent(Constants.W.W1.shield.additionalAttack),
                7: RatioPercent(Constants.W.W1.shield_enhance),
                8: Constants.W.W2.damage.base,
                9: RatioPercent(Constants.W.W2.damage.additionalAttack),
                10: Constants.W.W2.final_target_damage.base,
                11: RatioPercent(Constants.W.W2.final_target_damage.additionalAttack),
                12: Constants.W.W2.airborne,
                13: Constants.W.W3.first_damage.base,
                14: RatioPercent(Constants.W.W3.first_damage.additionalAttack),
                15: w3Count(status.attackSpeed.multiplier),
                16: Constants.W.W3.max_count,
                17: RatioPercent(Constants.W.W3.first_heal),
                18: Constants.W.W3.second_damage.base,
                19: RatioPercent(Constants.W.W3.second_damage.additionalAttack),
                20: RatioPercent(Constants.W.W3.second_heal)
            }
        } else {
            return {
                0: Constants.W.W1.first_damage,
                1: Constants.W.W1.second_damage,
                2: RatioPercent(Constants.W.W1.second_damage.targetMaxHP),
                3: Constants.W.W1.shield,
                4: RatioPercent(Constants.W.W1.shield_enhance),
                5: Constants.W.W2.damage,
                6: Constants.W.W2.final_target_damage,
                7: Constants.W.W2.airborne,
                8: Constants.W.W3.first_damage,
                9: w3Count(status.attackSpeed.multiplier),
                10: RatioPercent(Constants.W.W3.first_heal),
                11: Constants.W.W3.second_damage,
                12: RatioPercent(Constants.W.W3.second_heal)
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.W.W3.animal_heal)
        },
        enumeratedValues: [
            { labelIntlID: "ToolTipType/W1FirstDamage", values: Constants.W.W1.first_damage.base },
            { labelIntlID: "ToolTipType/W1SecondDamage", values: Constants.W.W1.second_damage.base },
            { labelIntlID: "ToolTipType/W1Shield", values: Constants.W.W1.shield.base },
            { labelIntlID: "ToolTipType/W2BaseDamage", values: Constants.W.W2.damage.base },
            { labelIntlID: "ToolTipType/W2FarthestTargetDamage", values: Constants.W.W2.final_target_damage.base },
            { labelIntlID: "ToolTipType/W3TickAdditionalAttackPower", values: Constants.W.W3.first_damage.additionalAttack, percent: true },
            { labelIntlID: "ToolTipType/W3FinalDamage", values: Constants.W.W3.second_damage.base },
        ]
    })
}
