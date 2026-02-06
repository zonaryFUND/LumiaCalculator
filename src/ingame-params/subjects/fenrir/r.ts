import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1086500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base: TooltipValues = {
            2: Constants.R.slow.duration,
            3: RatioPercent(Constants.R.slow.effect),
            4: Constants.R.shield.duration
        }
        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.R.damage.attack),
                1: RatioPercent(Constants.R.shield.effect.attack),
                20: Constants.R.damage.base,
                21: Constants.R.shield.effect.base,
            }
        } else {
            return {
                ...base,
                20: Constants.R.damage,
                21: Constants.R.shield.effect
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.R.shield.effect.base},
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
