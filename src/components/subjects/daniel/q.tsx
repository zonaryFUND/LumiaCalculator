import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1037200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.damage.base[skillLevel],
        1: `${Constants.Q.damage.attack}%`,
        2: Constants.Q.center_damage.base[skillLevel],
        3: `${Constants.Q.center_damage.attack}%`,
        5: Constants.Q.slow.duration,
        6: `${Constants.Q.slow.effect}%`,
        7: `${Constants.Q.basic_attack_enhance.attack_speed[skillLevel]}%`,
        20: Constants.Q.damage,
        21: Constants.Q.center_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "StatType/AttackSpeed", values: Constants.Q.basic_attack_enhance.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.Q.center_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
        ]  
    })
}
