import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1010200;

export const info: TooltipInfo = {
    skill: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.damage.base[skillLevel],
        1: `${Constants.Q.damage.attack}%`,
        2: Constants.Q.enhanced_damage.base[skillLevel],
        3: `${Constants.Q.enhanced_damage.attack}%`,
        20: Constants.Q.damage,
        21: Constants.Q.enhanced_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/DrinkDamage", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
