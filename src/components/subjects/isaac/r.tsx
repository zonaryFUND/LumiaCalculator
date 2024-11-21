import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1059500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation, config, status }) => {
        const stack = Constants.R.additionalDamage.stack[skillLevel];
        const min = calculateValue({
            base: stack,
            attack: Constants.R.additionalDamage.attack,
        }, status, config, skillLevel).static.floor().toString();
        const max = calculateValue({
            base: stack * 2,
            attack: Constants.R.additionalDamage.attack
        }, status, config, skillLevel).static.floor().toString();
        const base = {
            0: Constants.E.time_bound
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.R.damage.base[skillLevel],
                1: `${Constants.R.damage.attack}%`,
                3: `${stack}%`,
                4: `${Constants.R.additionalDamage.attack}%`,
                5: `${Constants.R.slow}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.damage,
                1: `${min}%`,
                2: `${Constants.R.slow}%`,
                3: `${max}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/DamageTargetLossHpCoefByLevel", values: Constants.R.additionalDamage.stack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
