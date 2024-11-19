import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1025300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.W.damage_duration : Constants.W.duration[skillLevel],
        1: showEquation ? Constants.W.damage.base[skillLevel] : Constants.W.damage_duration,
        2: showEquation ? `${Constants.W.damage.attack}%` : Constants.W.damage,
        3: Constants.W.bind,
        4: showEquation ? Constants.W.duration[skillLevel] : Constants.W.charge.max[skillLevel],
        5: showEquation ? Constants.W.charge.max[skillLevel] : Constants.W.setup[skillLevel],
        6: Constants.W.setup[skillLevel]
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BleedDanage", values: Constants.W.damage.base}, // typo key
            {labelIntlID: "ToolTipType/Time", values: Constants.W.duration},
            {labelIntlID: "ToolTipType/MaxInstall", values: Constants.W.setup},
            {labelIntlID: "ToolTipType/MaxChargeCount", values: Constants.W.charge.max},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
