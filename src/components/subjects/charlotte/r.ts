import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 1073500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.channeling,
        1: Constants.R.duration,
        2: Constants.R.amp
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/ApDamage", values: Constants.R.amp}
        ]  
    })
}
