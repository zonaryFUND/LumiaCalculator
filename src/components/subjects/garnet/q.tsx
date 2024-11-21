import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1076200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "hp-ratio",
        value: Constants.Q.hp_cost_percent
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.Q1_damage.base[skillLevel],
                1: `${Constants.Q.Q1_damage.amp}%`,
                2: `${Constants.Q.Q1_damage.maxHP}%`,
                3: Constants.Q.slow.duration,
                4: `${Constants.Q.slow.effect}%`,
                5: Constants.Q.reuse,
                6: Constants.Q.Q2_damage.base[skillLevel],
                7: `${Constants.Q.Q2_damage.amp}%`,
                8: `${Constants.Q.Q2_damage.maxHP}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.Q1_damage,
                1: Constants.Q.slow.duration,
                2: `${Constants.Q.slow.effect}%`,
                3: Constants.Q.reuse,
                4: Constants.Q.Q2_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.Q1_damage.base},
            {labelIntlID: "ToolTipType/ReactivateDamage", values: Constants.Q.Q2_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
