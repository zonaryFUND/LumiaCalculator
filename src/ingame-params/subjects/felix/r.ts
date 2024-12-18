import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1049500;

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
                0: Constants.R.min_damage.base,
                1: RatioPercent(Constants.R.min_damage.attack),
                2: Constants.R.max_damage.base,
                3: RatioPercent(Constants.R.max_damage.attack),
                4: Constants.R.stun,
                5: Constants.R.stack_gain
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.min_damage,
                1: Constants.R.max_damage,
                2: Constants.R.stun,
                3: Constants.R.stack_gain
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.R.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.R.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
