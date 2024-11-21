import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1061500;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.IremR.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            1: Constants.IremR.bell,
            2: Constants.common.fish,
            3: Constants.common.fish_max
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.IremR.damage.base[skillLevel],
                5: `${Constants.IremR.damage.amp[skillLevel]}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.IremR.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.IremR.range_penalty
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ApDamage", values: Constants.IremR.damage.amp},
            {labelIntlID: "ToolTipType/Damage", values: Constants.IremR.damage.base},
        ]  
    })
}
