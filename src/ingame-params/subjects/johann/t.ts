import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1041100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.tenacity),
        1: Constants.T.tenacity_ally.duration,
        2: RatioPercent(Constants.T.tenacity_ally.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/JohannTenacity", values: Constants.T.tenacity, percent: true},
            {labelIntlID: "ToolTipType/JohannAllyTenacity", values: Constants.T.tenacity_ally.effect, percent: true}
        ]  
    })
}
