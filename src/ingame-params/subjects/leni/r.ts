import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1069500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.damage.base,
                1: Constants.R.damage.level,
                2: RatioPercent(Constants.R.damage.amp),
                3: Constants.R.slow.duration,
                4: RatioPercent(Constants.R.slow.effect)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.damage,
                1: Constants.R.slow.duration,
                2: RatioPercent(Constants.R.slow.effect)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
