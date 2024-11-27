import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1016600;

export const info: TooltipInfo = {
    skill: "Q",
    cooldown: Constants.BikeQ.cooldown,
    values: ({ }) => ({
        0: Constants.BikeQ.damage.base,
        2: RatioPercent(Constants.BikeQ.damage.amp),
        20: Constants.BikeQ.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.BikeQ.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.BikeQ.cooldown},
        ]  
    })
}
