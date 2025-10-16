import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1011300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            0: Constants.W.cooldown_reduction,
            1: Constants.W.channeling,
            3: Constants.W.e_cooldown_reduction,
            4: 4
        }
        if (showEquation) {
            return {
                ...common,
                2: Constants.W.damage_reduction.base,
                5: RatioPercent(Constants.W.damage_reduction.attack)
            }
        } else {
            return {
                ...common,
                2: RatioPercent(Constants.W.damage_reduction),
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
