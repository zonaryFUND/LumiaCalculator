import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1007400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.E.damage.targetHP[skillLevel]}%`,
        1: Constants.E.stun,
        2: Constants.E.wall_damage.base[skillLevel],
        3: `${Constants.E.damage.additionalAttack}%`,
        7: `${Constants.E.wall_damage.additionalAttack}%`,
        8: `${Constants.E.damage.amp}%`,
        9: `${Constants.E.wall_damage.amp}%`,
        20: Constants.E.damage,
        21: Constants.E.wall_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/PresentHpDamageRatio", values: Constants.E.damage.targetHP},
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.wall_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
