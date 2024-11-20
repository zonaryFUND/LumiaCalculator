import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1014200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        1: showEquation ? Constants.Q.damage.base[skillLevel] : Constants.Q.damage,
        2: Constants.Q.additional_damage,
        3: Constants.Q.heal_duration,
        4: showEquation ? Constants.Q.heal.base[skillLevel] : Constants.Q.heal,
        5: Constants.Q.additional_damage.base[skillLevel],
        6: `${Constants.Q.damage.amp}%`,
        8: `${Constants.Q.additional_damage.amp}%`,
        10: `${Constants.Q.heal.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.additional_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.Q.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
        ]  
    })
}
