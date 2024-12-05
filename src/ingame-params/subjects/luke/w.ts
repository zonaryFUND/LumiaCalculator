import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.attack),
                2: RatioPercent(Constants.W.heal),
                3: Constants.W.cooldown_reduction,
                4: RatioPercent(Constants.W.max_heal)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: RatioPercent(Constants.W.heal),
                2: Constants.W.cooldown_reduction,
                3: RatioPercent(Constants.W.max_heal)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
