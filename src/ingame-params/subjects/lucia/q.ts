import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1090200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            2: Constants.Q.slow.duration,
            3: RatioPercent(Constants.Q.slow.effect)
        }
        if (showEquation) {
            return {
                ...common,
                20: Constants.Q.damage.base,
                21: RatioPercent(Constants.Q.damage.amp),
                22: Constants.Q.enhanced_damage.base,
                23: RatioPercent(Constants.Q.enhanced_damage.amp)
            }
        } else {
            return {
                ...common,
                0: Constants.Q.damage,
                1: Constants.Q.enhanced_damage,

            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/LuciaQ1Damage", values: Constants.Q.damage.base },
            { labelIntlID: "ToolTipType/LuciaQ2Damage", values: Constants.Q.enhanced_damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown }
        ]
    })
}
