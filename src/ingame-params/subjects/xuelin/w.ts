import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1082300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.W.cc_immune,
                1: Constants.W.damage.base,
                2: RatioPercent(Constants.W.damage.attack),
                3: Constants.W.slow.duration,
                4: RatioPercent(Constants.W.slow.effect),
                5: Constants.W.stack_gain,
                6: Constants.W.enhanced_damage.base,
                7: RatioPercent(Constants.W.enhanced_damage.attack),
                8: Constants.W.stun
            }
        } else {
            return {
                0: Constants.W.cc_immune,
                1: Constants.W.damage,
                2: Constants.W.slow.duration,
                3: RatioPercent(Constants.W.slow.effect),
                4: Constants.W.stack_gain,
                5: Constants.W.enhanced_damage,
                6: Constants.W.stun
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/ReinforceDamage", values: Constants.W.enhanced_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
