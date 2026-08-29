import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1079200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "energy",
        value: Constants.Q.gauge_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                1: RatioPercent(Constants.Q.damage.amp),
                2: Constants.Q.reuse,
                3: Constants.Q.reuse_damage.base,
                4: RatioPercent(Constants.Q.reuse_damage.amp),
                5: Constants.Q.slow.duration,
                6: RatioPercent(Constants.Q.slow.effect),
                7: Constants.Q.w_cooldown_reduction
            }
        } else {
            return {
                0: Constants.Q.damage,
                1: Constants.Q.reuse,
                2: Constants.Q.reuse_damage,
                3: Constants.Q.slow.duration,
                4: RatioPercent(Constants.Q.slow.effect),
                5: Constants.Q.w_cooldown_reduction
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base },
            { labelIntlID: "ToolTipType/ReactivateDamage", values: Constants.Q.reuse_damage.base }
        ]
    })
}
