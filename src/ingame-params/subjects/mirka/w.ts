import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValue, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1085300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation}): TooltipValues => {    
        const common: TooltipValues = {
            0: Constants.W.duration,
            2: RatioPercent(Constants.W.impluse_gain_increase.defense / 100)
        }

        if (showEquation) {
            return {
                ...common,
                1: Constants.W.shield.base,
                20: RatioPercent(Constants.W.shield.amp),
                21: RatioPercent(Constants.W.shield.maxHP)
            }
        } else {
            return {
                ...common,
                1: Constants.W.shield,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/MaxHpShieldRatio", values: Constants.W.shield.maxHP, percent: true}
        ]  
    })
}
