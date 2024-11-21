import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1061300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.IremW.sp_cost
    },
    cooldown: Constants.IremW.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            1: `${Constants.IremW.slow}%`,
            2: Constants.IremW.channel,
            3: Constants.IremW.charm[skillLevel],
            4: Constants.IremW.slow_remain
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.IremW.damage.base[skillLevel],
                6: `${Constants.IremW.damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.IremW.damage,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.IremW.damage.base},
            {labelIntlID: "ToolTipType/CharmDuration", values: Constants.IremW.charm},
            {labelIntlID: "ToolTipType/Cost", values: Constants.IremW.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.IremW.cooldown},
        ]  
    })
}
