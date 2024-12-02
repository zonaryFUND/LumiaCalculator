import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1016900;

export const info: SkillTooltipProps = {
    skillKey: "R",
    values: ({ showEquation }) => {
        const base = {
            1: Constants.BikeR.duration
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.BikeR.damage.base,
                2: RatioPercent(Constants.BikeR.damage.attack),
                3: RatioPercent(Constants.BikeR.damage.amp)
            }
        } else {
            return {
                ...base,
                0: Constants.BikeR.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.BikeR.damage.base}
        ]  
    })
}
