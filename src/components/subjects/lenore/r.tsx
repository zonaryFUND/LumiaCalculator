import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1075500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.duration,
                1: Constants.R.damage_tick,
                2: Constants.R.damage.base[skillLevel],
                3: `${Constants.R.damage.amp}%`,
                4: `${Constants.R.slow}%`,
                5: Constants.R.max_stack,
                6: Constants.R.finish_damage.base[skillLevel],
                7: `${Constants.R.finish_damage.amp}%`,
                8: Constants.R.insane[skillLevel]
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.duration,
                1: Constants.R.damage_tick,
                2: Constants.R.damage,
                3: `${Constants.R.slow}%`,
                4: Constants.R.max_stack,
                5: Constants.R.finish_damage,
                6: Constants.R.insane[skillLevel]
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: `${Constants.R.insane_attack_speed}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DotDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ExplosionDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/InsanityDuration", values: Constants.R.insane},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
