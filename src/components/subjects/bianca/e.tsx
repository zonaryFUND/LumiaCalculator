import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1042400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "hp-ratio",
        value: Constants.E.hp_cost_percent
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.max_charge,
        1: Constants.E.charge_remain,
        4: showEquation ? Constants.E.min_damage.base[skillLevel] : Constants.E.min_damage,
        5: Constants.E.max_damage,
        6: Constants.E.max_damage.base[skillLevel],
        8: showEquation ? Constants.E.heal.base[skillLevel] : Constants.E.heal,
        10: Constants.E.additional_cost.per,
        11: `${Constants.E.additional_cost.value}%`,
        12: `${Constants.E.multiple_hit_heal_amp}%`,
        13: `${Constants.E.min_damage.amp}%`,
        14: `${Constants.E.max_damage.amp}%`,
        15: `${Constants.E.heal.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.E.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.E.max_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.E.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
