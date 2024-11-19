import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1046400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.E.damage.base[skillLevel],
        1: `${Constants.E.damage.attack}%`,
        2: Constants.E.movement_speed.duration,
        3: `${Constants.E.movement_speed.effect[skillLevel]}%`,
        4: Constants.E.rush_damage.base[skillLevel],
        5: `${Constants.E.rush_damage.attack}%`,
        20: Constants.E.damage,
        21: Constants.E.rush_damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BackstepDamage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.E.movement_speed.effect},
            {labelIntlID: "ToolTipType/VoltrushDamage", values: Constants.E.rush_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
