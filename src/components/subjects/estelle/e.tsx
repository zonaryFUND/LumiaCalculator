import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1055400;

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
            1: Constants.E.invulnerable
        }
        if (showEquation) {
            return {
                ...base,
                2: `${Constants.E.damage_reduction.base[skillLevel]}%`,
                3: `${Constants.E.damage_reduction.amp}%`,
                4: Constants.E2.damage.base[skillLevel],
                5: `${Constants.E2.damage.maxHP}%`,
                6: `${Constants.E2.damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: `${calculateValue(Constants.E.damage_reduction, status, config, skillLevel).static.floor().toString()}%`,
                4: Constants.E2.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/EstelleDamageReduction", values: Constants.E.damage_reduction.base, percent: true},
            {labelIntlID: "ToolTipType/EstelleSkillDamage2_2", values: Constants.E2.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
