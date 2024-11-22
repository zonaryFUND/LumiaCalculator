import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1035300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.damage.base[skillLevel],
        1: `${Constants.W.damage.additionalAttack}%`,
        2: Constants.W.enhanced_damage.base[skillLevel],
        3: `${Constants.W.enhanced_damage.additionalAttack}%`,
        4: Constants.W.enhanced_stun,
        5: Constants.W.stun,
        6: `${Constants.W.damage.amp}%`,
        7: `${Constants.W.enhanced_damage.amp}%`,
        8: Constants.W.damage,
        9: Constants.W.enhanced_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.W.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
