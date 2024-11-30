import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1062500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.damage,
        1: Constants.R.duration,
        2: RatioPercent(Constants.R.movement_speed),
        3: Constants.R.hypercharge_duration,
        4: RatioPercent(Constants.R.attack_speed),
        5: Constants.R.hypercharge_q_charge,
        6: Constants.R.damage.base,
        8: RatioPercent(Constants.R.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.R.movement_speed.base, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.R.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
