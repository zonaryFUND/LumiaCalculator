import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1009400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: Constants.E.hide_duration[skillLevel],
            1: Constants.W.tick,
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.E.damage.base[skillLevel],
                2: `${Constants.E.damage.amp}%`,
                3: Constants.E.attack_duration
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.E.damage,
                2: Constants.E.attack_duration
            } as Record<number, number | string | ValueRatio>
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/StealthTime", values: Constants.E.hide_duration},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
