import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1030300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: `${Constants.common.charging_slow_penalty}%`,
            1: Constants.W.min_taunt[skillLevel],
            2: Constants.W.max_taunt[skillLevel],
        }
        if (showEquation) {
            return {
                ...base,
                3: Constants.W.min_damage.base[skillLevel],
                4: `${Constants.W.min_damage.attack}%`,
                5: `${Constants.W.min_damage.additionalMaxHP}%`,
                6: Constants.W.max_damage.base[skillLevel],
                7: `${Constants.W.max_damage.attack}%`,
                8: `${Constants.W.max_damage.additionalMaxHP}%`,
                9: Constants.W.damage_reduction_duration,
                10: "0%",
                11: `${Constants.W.max_damage_reduction[skillLevel]}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.W.min_damage,
                4: Constants.W.max_damage,
                5: Constants.W.damage_reduction_duration,
                6: "0%",
                7: `${Constants.W.max_damage_reduction[skillLevel]}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: `${Constants.common.return_cooldown}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.W.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.W.max_damage.base},
            {labelIntlID: "ToolTipType/ElevenTauntTime1", values: Constants.W.min_taunt},
            {labelIntlID: "ToolTipType/ElevenTauntTime2", values: Constants.W.max_taunt},
            {labelIntlID: "ToolTipType/ElevenFinalDamageReduction2", values: Constants.W.max_damage_reduction, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
