import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1061210;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.CatQ.sp_cost
    },
    cooldown: Constants.CatQ.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            3: Constants.CatQ.rush.tick * Constants.CatQ.rush.amount,
            4: Constants.CatQ.rush.tick,
            5: Constants.CatQ.bind,
            6: `${Constants.CatQ.additional_damage}%`
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.CatQ.damage.base[skillLevel],
                1: Constants.CatQ.rush_damage.base[skillLevel],
                8: `${Constants.CatQ.damage.amp}%`,
                10: `${Constants.CatQ.rush_damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.CatQ.damage,
                1: Constants.CatQ.rush_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Irem_FirstDamage", values: Constants.CatQ.damage.base},
            {labelIntlID: "ToolTipType/Irem_ContinueDamage", values: Constants.CatQ.rush_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.CatQ.cooldown},
        ]  
    })
}
