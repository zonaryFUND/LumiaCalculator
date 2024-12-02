import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3019000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.double_range,
            2: Constants.range,
            3: Constants.slow.duration,
            4: RatioPercent(Constants.slow.effect)
        }
        if (showEquation) {
            return {
                ...base,
                1: RatioPercent(Constants.damage.additionalAttack),
                6: RatioPercent(Constants.damage.amp),
                7: Constants.damage.base
            }
        } else {
            return {
                ...base,
                7: Constants.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.damage.amp, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
