import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1073300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.W.heal.base : Constants.W.heal,
        1: RatioPercent(Constants.W.heal.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.W.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
