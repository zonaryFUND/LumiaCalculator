import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1079400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "energy",
        value: Constants.E.gauge_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.E.duration,
                1: Constants.E.damage.base,
                2: RatioPercent(Constants.E.damage.amp),
                3: Constants.E.reuse_cost_increase.threshold,
                4: Constants.E.reuse_cost_increase.amount,
                5: Constants.E.max_cost
            }
        } else {
            return {
                0: Constants.E.duration,
                1: Constants.E.damage,
                2: Constants.E.reuse_cost_increase.threshold,
                3: Constants.E.reuse_cost_increase.amount,
                4: Constants.E.max_cost
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base }
        ]
    })
}
