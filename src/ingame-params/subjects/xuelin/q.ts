import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1082200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                1: RatioPercent(Constants.Q.damage.attack),
                2: Constants.Q.duration,
                3: Constants.Q.tick,
                4: Constants.Q.dot_damage.base,
                5: RatioPercent(Constants.Q.dot_damage.attack),
                6: RatioPercent(Constants.Q.e_cooldown_reduction),
                7: Constants.Q.retrieve_duration,
                8: Constants.Q.retrieve_tick,
                9: Constants.Q.retrieve_dot_damage.base,
                10: RatioPercent(Constants.Q.retrieve_dot_damage.attack)
            }
        } else {
            return {
                0: Constants.Q.damage,
                1: Constants.Q.duration,
                2: Constants.Q.tick,
                3: Constants.Q.dot_damage,
                4: RatioPercent(Constants.Q.e_cooldown_reduction),
                5: Constants.Q.retrieve_duration,
                6: Constants.Q.retrieve_tick,
                7: Constants.Q.retrieve_dot_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AlonsoActive2ProjectileDamage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/XuelinActive1_1Damage", values: Constants.Q.dot_damage.base},
            {labelIntlID: "ToolTipType/XuelinActive1_2Damage", values: Constants.Q.retrieve_dot_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
