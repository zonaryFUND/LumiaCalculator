import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3018000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base = {
            1: Constants.reuse,
            2: Constants.threshold,
        }
        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.first_damage.additionalAttack),
                3: RatioPercent(Constants.second_damage.additionalAttack),
                4: RatioPercent(Constants.first_damage.amp),
                5: RatioPercent(Constants.second_damage.amp),
                6: Constants.first_damage.base,
                7: Constants.second_damage.base
            }
        } else {
            return {
                ...base,
                6: Constants.first_damage,
                7: Constants.second_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant},
            {labelIntlID: "ToolTipType/DualswordApCoef", values: Constants.first_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/DualswordSkillAmpCoef", values: Constants.first_damage.amp, percent: true},
            {labelIntlID: "ToolTipType/ReactivateApCoef", values: Constants.second_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/ReactivateSkillAmpCoef", values: Constants.second_damage.amp, percent: true}
        ]  
    })
}
