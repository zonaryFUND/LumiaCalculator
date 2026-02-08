import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Decimal from "decimal.js";

export const code = 1078400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: ({ status }) => {
        return new Decimal(Constants.E.cooldown.constant).subPercent(status.attackSpeed.multiplier.clamp(0, 140).div(140).times(50)).floor2()
    },
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.additionalAttack)
            }
        } else {
            return {
                0: Constants.E.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base },
        ]
    })
}
