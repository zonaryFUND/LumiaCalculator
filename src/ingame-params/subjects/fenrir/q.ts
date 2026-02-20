import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1086200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base: TooltipValues = {
            3: Constants.Q.slow.duration,
            4: RatioPercent(Constants.Q.slow.effect),
            5: RatioPercent(Constants.Q.e_cooldown_reduction),
            6: Constants.Q.stack_duration
        }

        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.Q.damage.attack),
                1: RatioPercent(Constants.Q.enhanced_damage.attack),
                2: RatioPercent(Constants.Q.heal.attack),
                20: Constants.Q.damage.base,
                21: Constants.Q.enhanced_damage.base,
                22: Constants.Q.heal.base
            }
        } else {
            return {
                ...base,
                20: Constants.Q.damage,
                21: Constants.Q.enhanced_damage,
                22: Constants.Q.heal
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/ReinforceDamage", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.Q.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
