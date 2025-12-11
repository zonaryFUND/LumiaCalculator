import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1085500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = { 
            0: Constants.R.channel,
            1: Constants.R.movable_duration,
            3: RatioPercent(Constants.R.damage.targetMaxHP),
            4: Constants.R.airborne
        }

        if (showEquation) {
            return {
                ...common,
                2: Constants.R.damage.base,
                20: RatioPercent(Constants.R.damage.amp)
            }
        } else {
            return {
                ...common,

                2: Constants.R.damage,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
