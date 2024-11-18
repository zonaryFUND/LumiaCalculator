import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1067200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.Q.movement_speed.duration,
        1: `${Constants.Q.movement_speed.effect}%`,
        2: Constants.Q.first_damage.base[skillLevel],
        3: `${Constants.Q.first_damage.amp}%`,
        4: Constants.Q.second_damage.base[skillLevel],
        5: `${Constants.Q.second_damage.amp}%`,
        20: Constants.Q.first_damage,
        21: Constants.Q.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}