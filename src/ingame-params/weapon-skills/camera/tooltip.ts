import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 3023000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: Constants.additional_damage,
            3: Constants.vision
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.damage.base,
                1: RatioPercent(Constants.damage.additionalAttack),
                4: RatioPercent(Constants.damage.amp)
            }
        } else {
            return {
                ...base,
                0: Constants.damage,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.additional_damage},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.damage.amp, percent: true},
        ]  
    })
}
