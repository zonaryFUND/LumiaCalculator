import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1035400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            2: `${Constants.E.heal.min}%`,
            3: `${Constants.E.heal.max}%`,
            4: `${Constants.E.cooldown_reduction}%`
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.E.damage.base[skillLevel],
                1: `${Constants.E.damage.additionalAttack}%`,
                5: `${Constants.E.damage.amp}%`,
                6: `${Constants.E.damage.targetMaxHP}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                6: Constants.E.damage,
                7: `${Constants.E.damage.targetMaxHP}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
