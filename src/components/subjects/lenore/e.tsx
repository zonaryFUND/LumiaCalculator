import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1075400;

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
                1: `${Constants.E.damage.amp}%`,
                2: Constants.E.enhance_slow.duration,
                3: `${Constants.E.enhance_slow.effect}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.damage,
                1: Constants.E.enhance_slow.duration,
                2: `${Constants.E.enhance_slow.effect}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
