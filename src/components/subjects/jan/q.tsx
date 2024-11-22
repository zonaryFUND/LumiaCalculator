import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1035200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            2: Constants.Q.slow.duration,
            3: `${Constants.Q.slow.effect}%`,
            4: Constants.Q.defense_reduction.duration,
            5: `${Constants.Q.defense_reduction.effect}%`,
            10: Constants.Q.airborne
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.Q.damage.base[skillLevel],
                1: `${Constants.Q.damage.additionalAttack}%`,
                6: `${Constants.Q.damage.amp}%`,
                7: Constants.Q.Q2_damage.base[skillLevel],
                8: `${Constants.Q.Q2_damage.additionalAttack}%`,
                9: `${Constants.Q.Q2_damage.amp}`,
                11: `${Constants.Q.damage.targetMaxHP}%`,
                12: `${Constants.Q.Q2_damage.targetMaxHP}%`

            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                11: Constants.Q.damage,
                12: Constants.Q.Q2_damage,
                13: `${Constants.Q.damage.targetMaxHP}%`,
                14: `${Constants.Q.Q2_damage.targetMaxHP}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.Q2_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
