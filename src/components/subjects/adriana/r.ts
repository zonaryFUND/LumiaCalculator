import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1017500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    charge: Constants.R.charge,
    values: ({ }) => ({
        0: Constants.R.damage.base,
        3: Constants.R.charge.max,
        4: Constants.R.duration,
        5: RatioPercent(Constants.R.damage.amp),
        20: Constants.R.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.R.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}