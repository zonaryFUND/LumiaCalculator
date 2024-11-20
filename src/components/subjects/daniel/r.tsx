import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1037500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.duration,
        1: Constants.R.finish_damage.base[skillLevel],
        2: `${Constants.R.finish_damage.attack}%`,
        4: Constants.R.damage.base[skillLevel],
        5: `${Constants.R.damage.attack}%`,
        6: Constants.R.silence,
        9: Constants.R.window_after_attack,
        20: Constants.R.damage,
        21: Constants.R.finish_damage
    }), 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DotDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ShadowAttackDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
