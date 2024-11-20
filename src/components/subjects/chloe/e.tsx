import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1040400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.first_damage.base[skillLevel],
        1: `${Constants.E.first_damage.attack}%`,
        2: Constants.E.second_damage.base[skillLevel],
        3: `${Constants.E.second_damage.ninaAttack}%`,
        6: Constants.E.first_damage,
        7: Constants.E.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DamageScratch", values: Constants.E.first_damage.base},
            {labelIntlID: "ToolTipType/DamageNina", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
