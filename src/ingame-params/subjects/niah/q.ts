import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1081200;

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
                3: Constants.Q.damage.base,
                4: RatioPercent(Constants.Q.damage.amp),
                5: Constants.Q.pull_damage.base,
                6: RatioPercent(Constants.Q.pull_damage.amp),
                7: Constants.Q.slow.duration,
                8: RatioPercent(Constants.Q.slow.effect),                
                9: RatioPercent(Constants.Q.pull_q_cooldown_reduction),
                11: Constants.Q.w_cooldown_reduction,
                12: Constants.Q.max_buttons,
                13: Constants.Q.duration
            }
        } else {
            return {
                2: Constants.Q.damage,
                3: Constants.Q.pull_damage,
                4: Constants.Q.slow.duration,
                5: RatioPercent(Constants.Q.slow.effect),
                6: RatioPercent(Constants.Q.pull_q_cooldown_reduction),
                8: Constants.Q.w_cooldown_reduction,
                9: Constants.Q.max_buttons,
                10: Constants.Q.duration
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.Q.prural_hit)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/BulletDamage", values: Constants.Q.pull_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
