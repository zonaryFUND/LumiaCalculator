import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.DualSwordsQ.cooldown,
    consumption: {
        type: "vp",
        value: Constants.DualSwordsQ.vp_cost
    },
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.DualSwordsQ.first_damage.base,
                1: RatioPercent(Constants.DualSwordsQ.first_damage.additionalAttack),
                2: Constants.DualSwordsQ.first_damage.targetMaxHP.base,
                3: Constants.DualSwordsQ.first_damage.targetMaxHP.additionalAttack,
                4: Constants.DualSwordsQ.second_damage.base,
                5: RatioPercent(Constants.DualSwordsQ.second_damage.additionalAttack)
            }
        } else {
            return {
                0: Constants.DualSwordsQ.first_damage,
                1: RatioPercent(Constants.DualSwordsQ.first_damage.targetMaxHP),
                2: Constants.DualSwordsQ.second_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.DualSwordsQ.first_damage.base},
            {labelIntlID: "ToolTipType/FirstAdditionalAttackPower", values: Constants.DualSwordsQ.first_damage.additionalAttack},
            {labelIntlID: "ToolTipType/TargetMaxHpCoef", values: Constants.DualSwordsQ.first_damage.targetMaxHP.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.DualSwordsQ.second_damage.base},
            {labelIntlID: "ToolTipType/SecondAdditionalAttackPower", values: Constants.DualSwordsQ.second_damage.additionalAttack},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.DualSwordsQ.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.DualSwordsQ.vp_cost}
        ]  
    })
}
