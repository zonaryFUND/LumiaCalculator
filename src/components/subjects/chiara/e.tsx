import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1014400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.E.damage.base[skillLevel] : Constants.E.damage,
        1: Constants.E.duration,
        2: showEquation ? Constants.E.duration : Constants.E.second_damage,
        3: Constants.E.bind[skillLevel],
        4: Constants.E.second_damage.base[skillLevel],
        6: Constants.E.bind[skillLevel],
        7: `${Constants.E.damage.amp}%`,
        8: `${Constants.E.second_damage.amp}%`

    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/FetterTime", values: Constants.E.bind},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
