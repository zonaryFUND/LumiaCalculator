import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1050500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.outer_damage.base[skillLevel],
                1: `${Constants.R.outer_damage.defense}%`,
                3: Constants.R.center_damage.base[skillLevel],
                4: `${Constants.R.center_damage.defense}%`,
                5: `${Constants.R.outer_damage.amp}%`,
                6: `${Constants.R.center_damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.outer_damage,
                1: Constants.R.center_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.outer_damage.base},
            {labelIntlID: "ToolTipType/DamageIcePillar", values: Constants.R.center_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
