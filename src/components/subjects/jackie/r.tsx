import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1001500;

const maxDamage = {
    base: Constants.R.finish_damage.base.map(v => v * Constants.R.finish_multiplier_max),
    attack: Constants.R.finish_damage.attack * Constants.R.finish_multiplier_max
}

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: Constants.R.duration[skillLevel],
            1: Constants.R.extend,
            2: Constants.R.finish_time
        }
        if (showEquation) {
            return {
                ...base,
                3: Constants.R.damage.base[skillLevel],
                4: `${Constants.R.damage.attack}%`,
                6: Constants.R.finish_damage.base[skillLevel],
                7: maxDamage.base[skillLevel],
                8: `${Constants.R.finish_damage.attack}%`,
                10: `${maxDamage.attack}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.R.damage,
                4: Constants.R.finish_damage,
                5: maxDamage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: `${Constants.R.finish_multiplier_max_hp}%`,
            1: `${Constants.R.dualsword_multiplier}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ChainSawDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/Time", values: Constants.R.duration}
        ]  
    })
}
