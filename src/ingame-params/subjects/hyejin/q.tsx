import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1012200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                2: RatioPercent(Constants.Q.damage.amp),
                3: RatioPercent(Constants.Q.cooldown_reduction)
            }
        } else {
            return {
                0: Constants.Q.damage,
                1: `${Constants.Q.cooldown_reduction}%`
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
