import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1051200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    charge: Constants.Q.charge,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        2: Constants.Q.bloomed_damage.base,
        5: Constants.Q.charge_reduction,
        6: RatioPercent(Constants.Q.damage.amp),
        7: RatioPercent(Constants.Q.bloomed_damage.amp),
        20: Constants.Q.damage,
        21: Constants.Q.bloomed_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/FullBloomDamage", values: Constants.Q.bloomed_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.Q.charge.time}
        ]  
    })
}
