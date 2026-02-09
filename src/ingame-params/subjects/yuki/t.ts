import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 1011100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.T.damage.base,
                1: RatioPercent(Constants.T.damage.attack)
            }
        } else {
            return {
                0: Constants.T.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/R1AdditionalAttackPower", values: Constants.T.damage.attack, percent: true }
        ]
    })
}
