import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1011500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            2: Constants.R.slow.duration,
            3: RatioPercent(Constants.R.slow.effect)
        }
        if (showEquation) {
            return {
                ...common,
                0: Constants.R.damage.base,
                1: RatioPercent(Constants.R.damage.attack),
                6: Constants.R.mark_damage.targetMaxHP.base,
                7: RatioPercent(Constants.R.mark_damage.targetMaxHP.attack)
            }
        } else {
            return {
                ...common,
                6: RatioPercent(Constants.R.mark_damage.targetMaxHP),
                20: Constants.R.damage
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/MaxhpDamage", values: Constants.R.mark_damage.targetMaxHP.base, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
