import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1046300;

const maxConstant = {
    base: Constants.W.damage.base.map(b => b * Constants.W.max_multiplier),
    attack: Constants.W.damage.attack * Constants.W.max_multiplier
}

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.W.damage.base[skillLevel],
        1: `${Constants.W.damage.attack}%`,
        2: maxConstant.base[skillLevel],
        3: `${maxConstant.attack}%`,
        4: Constants.W.slow.duration,
        5: `${Constants.W.slow.effect}%`,
        6: Constants.W.field_duration,
        7: Constants.W.field_damage.base[skillLevel],
        8: `${Constants.W.field_damage.attack}%`,
        9: Constants.W.bind[skillLevel],
        20: Constants.W.damage,
        21: maxConstant,
        22: Constants.W.field_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: maxConstant.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.W.field_damage.base},
            {labelIntlID: "ToolTipType/FetterTime", values: Constants.W.bind},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
