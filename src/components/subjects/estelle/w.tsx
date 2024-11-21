import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1055300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base[skillLevel],
                2: `${Constants.W.damage.amp}%`,
                3: Constants.W.slow.duration,
                4: `${Constants.W.slow.effect}%`,
                5: Constants.W2.duration,
                6: Constants.W2.damage.base[skillLevel],
                7: `${Constants.W2.damage.maxHP}%`,
                8: `${Constants.W2.damage.amp}%`,
                9: `${Constants.W2.slow_max}%`,
                10: Constants.W2.tick
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.slow.duration,
                2: `${Constants.W.slow.effect}%`,
                3: Constants.W2.duration,
                4: Constants.W2.damage,
                5: `${Constants.W2.slow_max}%`,
                6: Constants.W2.tick
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/EstelleSkillDamage2_1", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/EstelleSkillDamage3_2", values: Constants.W2.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
