import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1045300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        2: Constants.W.duration,
        3: Constants.W.basic_attack_damage,
        4: RatioPercent(Constants.W.movement_speed),
        5: Constants.W.charge.max,
        7: Constants.W.charge_time_reduction,
        10: RatioPercent(Constants.W.defense),
        11: RatioPercent(Constants.W.damage.amp),
        12: RatioPercent(Constants.W.defense),
        20: Constants.W.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/IncreaseDefenceRatio", values: Constants.W.defense, percent: true},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time}
        ]  
    })
}
