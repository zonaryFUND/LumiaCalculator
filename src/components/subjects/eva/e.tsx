import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1036400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.damage.base[skillLevel],
        4: Constants.E.vision_duration,
        5: Constants.E.vflight_duration,
        7: `${Constants.E.damage.amp}%`,
        8: Constants.E.vitalforce,
        9: Constants.E.movement_speed.duration,
        10: `${Constants.E.movement_speed.effect[skillLevel]}%`,
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.E.movement_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
