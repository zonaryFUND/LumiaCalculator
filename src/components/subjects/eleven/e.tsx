import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1030400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.E.min_damage.base[skillLevel],
                1: `${Constants.E.min_damage.attack}%`,
                2: `${Constants.E.min_damage.additionalMaxHP}%`,
                3: Constants.E.max_damage.base[skillLevel],
                4: `${Constants.E.max_damage.attack}%`,
                5: `${Constants.E.max_damage.additionalMaxHP}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.min_damage,
                1: Constants.E.max_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: `${Constants.common.return_cooldown}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.E.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.E.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
