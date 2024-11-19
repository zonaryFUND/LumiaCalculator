import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1026300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation, skillLevel }) => ({
        0: showEquation ? Constants.W.damage.base[skillLevel] : Constants.W.damage,
        1: showEquation ? `${Constants.W.damage.amp}%` : Constants.W.movement_speed.duration,
        2: showEquation ? Constants.W.movement_speed.duration : `${Constants.W.movement_speed.effect}%`,
        3: showEquation ? `${Constants.W.movement_speed.effect}%` : Constants.W.movement_speed.duration,
        4: Constants.W.movement_speed.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
