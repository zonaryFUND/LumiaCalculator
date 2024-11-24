import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1058200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    charge: Constants.Q.charge,
    values: ({ }) => ({
        0: Constants.Q.outer_damage,
        3: Constants.Q.center_damage,
        20: Constants.Q.outer_damage.base,
        22: RatioPercent(Constants.Q.outer_damage.amp),
        23: Constants.Q.center_damage.base,
        25: RatioPercent(Constants.Q.center_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Haze_GrenadeOuterDamage", values: Constants.Q.outer_damage.base},
            {labelIntlID: "ToolTipType/Haze_GrenadeInnerDamage", values: Constants.Q.center_damage.base},
            {labelIntlID: "ToolTipType/Haze_GrenadeCooldown", values: Constants.Q.charge.time},
            {labelIntlID: "ToolTipType/Haze_SubmachinegunDamage", values: Constants.Q2.damage.base},
            {labelIntlID: "ToolTipType/Haze_AccRocketDamage", values: Constants.Q3.damage.base}
        ]  
    })
}
