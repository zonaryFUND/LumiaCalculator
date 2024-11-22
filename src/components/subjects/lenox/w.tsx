import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1020300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.first_damage.base[skillLevel],
        3: Constants.W.second_damage.base[skillLevel],
        5: Constants.W.slow.duration,
        6: `${Constants.W.slow.effect}%`,
        9: `${Constants.W.first_damage.amp}%`,
        10: `${Constants.W.second_damage.amp}%`,
        11: Constants.W.first_damage,
        12: Constants.W.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.W.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.W.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
