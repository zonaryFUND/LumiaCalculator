import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1001400;

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
                0: Constants.E.damage.base[skillLevel],
                1: `${Constants.E.damage.attack}%`,
                2: Constants.E.slow.duration,
                3: `${Constants.E.slow.effect}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.damage,
                1: Constants.E.slow.duration,
                2: `${Constants.E.slow.effect}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
