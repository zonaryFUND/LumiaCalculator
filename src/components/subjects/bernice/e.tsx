import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1025400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.duration,
        1: Constants.E.vision[skillLevel],
        2: Constants.E.marking_period,
        3: Constants.E.mark_duration,
        4: Constants.E.q_cooldown_reduction,
        5: Constants.E.r_cooldown_reduction,
        6: `${Constants.E.movement_speed[skillLevel]}%`,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SightRange", values: Constants.E.vision},
            {labelIntlID: "ToolTipType/ChaseMoveSpeed", values: Constants.E.movement_speed},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
        ]  
    })
}
