import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1042200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "hp-ratio",
        value: Constants.Q.hp_cost_percent
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.Q.first_damage.base[skillLevel] : Constants.Q.first_damage,
        1: Constants.Q.second_damage,
        2: Constants.Q.second_damage.base[skillLevel],
        4: `${Constants.Q.second_damage.targetMaxHP}%`,
        5: Constants.Q.bind,
        6: `${Constants.Q.first_damage.amp}%`,
        7: `${Constants.Q.second_damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
