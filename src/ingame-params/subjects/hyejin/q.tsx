import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1012200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
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
            { labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown }
        ]
    })
}
