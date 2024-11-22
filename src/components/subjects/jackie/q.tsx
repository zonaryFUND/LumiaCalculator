import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1001200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.first_damage.base[skillLevel],
                1: Constants.Q.second_damage.base[skillLevel],
                2: `${Constants.Q.first_damage.attack}%`,
                4: `${Constants.Q.second_damage.attack}%`,
                6: `${Constants.Q.first_damage.targetMaxHP}%`,
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.first_damage,
                1: Constants.Q.second_damage,
                2: `${Constants.Q.first_damage.targetMaxHP}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
