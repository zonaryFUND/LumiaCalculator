import { RatioPercent } from "components/tooltip/skill/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";

export const code = 3002000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.duration,
        1: RatioPercent(Constants.reflected_ratio)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ReturnDamageCoef", values: Constants.reflected_ratio, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
