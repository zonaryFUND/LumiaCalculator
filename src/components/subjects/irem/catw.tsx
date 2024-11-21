import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1061310;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.CatW.sp_cost
    },
    cooldown: Constants.CatW.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            1: Constants.CatW.airborne,
            2: Constants.CatW.cooldown_reduction
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.CatW.damage.base[skillLevel],
                4: `${Constants.CatW.damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.CatW.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.CatW.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.CatW.sp_cost},
        ]  
    })
}
