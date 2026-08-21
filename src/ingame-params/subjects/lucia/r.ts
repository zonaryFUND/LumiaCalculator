import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1090500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            1: Constants.R.stun
        }
        if (showEquation) {
            return {
                ...common,
                20: Constants.R.damage.base,
                21: RatioPercent(Constants.R.damage.amp)
            }
        } else {
            return {
                ...common,
                0: Constants.R.damage,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]
    })
}
