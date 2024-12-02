import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1061210;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.CatQ.sp_cost
    },
    cooldown: Constants.CatQ.cooldown,
    values: ({ showEquation }) => {
        const base = {
            3: Constants.CatQ.rush.tick * Constants.CatQ.rush.amount,
            4: Constants.CatQ.rush.tick,
            5: Constants.CatQ.bind,
            6: RatioPercent(Constants.CatQ.additional_damage)
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.CatQ.damage.base,
                1: Constants.CatQ.rush_damage.base,
                8: RatioPercent(Constants.CatQ.damage.amp),
                10: RatioPercent(Constants.CatQ.rush_damage.amp)
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
