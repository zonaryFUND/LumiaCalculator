import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 1034500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.cast,
        1: Constants.R.statis,
        2: Constants.T.max_stack
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
