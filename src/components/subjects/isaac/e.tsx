import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1059400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: Constants.E.time_bound
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.E.damage.base[skillLevel],
                2: `${Constants.E.damage.attack}%`,
                4: Constants.E.stun,
                5: Constants.E.defense_down.duration,
                6: `${Constants.E.defense_down.effect}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.E.damage,
                2: Constants.E.stun,
                3: Constants.E.defense_down.duration,
                4: `${Constants.E.defense_down.effect}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
