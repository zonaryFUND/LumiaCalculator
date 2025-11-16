import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1012400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.amp),
                2: Constants.E.second_damage.base,
<<<<<<< HEAD
                3: RatioPercent(Constants.E.second_damage.amp)
=======
                3: RatioPercent(Constants.E.second_damage.amp),
>>>>>>> recovery-9.0
            }
        } else {
            return {
                0: Constants.E.damage,
                1: Constants.E.second_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ProjectileDamage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/ArriveDamage", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
