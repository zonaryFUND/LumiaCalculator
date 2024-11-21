import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1050300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            3: `${Constants.W.defense}%`,
            6: `${Constants.W.q_cooldown_reduction}%`,
            7: `${Constants.W.enhanced_cooldown_reduction}%`
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.W.damage.base[skillLevel],
                8: `${Constants.W.damage.additionalMaxHP}%`,
                9: `${Constants.W.damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.W.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
