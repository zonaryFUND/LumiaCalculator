import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1023400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.E.damage.base[skillLevel] : Constants.E.damage,
        1: Constants.E.knockback_damage,
        2: Constants.E.bind,
        3: Constants.E.stun,
        4: Constants.E.knockback_damage.base[skillLevel],
        6: `${Constants.E.damage.amp}%`,
        7: `${Constants.E.knockback_damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.E.knockback_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
