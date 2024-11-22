import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1071400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation, config, status }) => {
        const base = {
            0: Constants.E.duration,
            1: `${Constants.E.attack_speed[skillLevel]}%`
        }
        if (showEquation) {
            return {
                ...base,
                3: Constants.E.damage.base[skillLevel],
                4: `${Constants.E.damage.attack}%`,
                5: `${Constants.E.cooldown_reduction[skillLevel]}%`,
                6: `${Constants.E.damage_conversion}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.E.damage,
                4: `${Constants.E.cooldown_reduction[skillLevel]}%`,
                5: `${Constants.E.damage_conversion}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.E.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.E.cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
