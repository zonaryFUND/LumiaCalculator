import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.attack),
                3: Constants.E.slow.duration,
                4: RatioPercent(Constants.E.slow.effect),
                5: RatioPercent(Constants.E.execute_threshold)
            }
        } else {
            return {
                0: Constants.E.damage,
                1: Constants.E.slow.duration,
                2: RatioPercent(Constants.E.slow.effect),
                3: RatioPercent(Constants.E.execute_threshold)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
