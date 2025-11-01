import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { CriticalMultipier, RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: RatioPercent(Constants.T.dual_swords.attack_speed),
            1: RatioPercent(Constants.T.dual_swords.attack),
            2: RatioPercent(Constants.T.dual_swords.attack),
            3: Constants.T.double_bladed_sword.range,
            4: RatioPercent(Constants.T.double_bladed_sword.attack),
            5: Constants.T.shift_duration
        };

        if (showEquation) {
            return {
                ...base,
                6: Constants.T.heal.base,
                7: RatioPercent(Constants.T.heal.additionalAttack),
                8: Constants.T.vp_heal,
                9: Constants.T.dual_swords.additional_damage.base,
                10: RatioPercent(Constants.T.dual_swords.additional_damage.additionalAttack),
                11: Constants.T.double_bladed_sword.additional_damage.base,
                12: RatioPercent(Constants.T.double_bladed_sword.additional_damage.additionalAttack),
                13: RatioPercent(Constants.T.dual_swords.cooldown_reduction),
                14: RatioPercent(Constants.T.double_bladed_sword.cooldown_reduction),
                15: Constants.T.dual_swords.vp_heal,
                16: Constants.T.double_bladed_sword.vp_heal
            }
        } else {
            return {
                ...base,
                6: RatioPercent(Constants.T.heal),
                7: Constants.T.vp_heal,
                8: Constants.T.dual_swords.additional_damage,
                9: Constants.T.double_bladed_sword.additional_damage,
                10: RatioPercent(Constants.T.dual_swords.cooldown_reduction),
                11: RatioPercent(Constants.T.double_bladed_sword.cooldown_reduction),
                12: Constants.T.dual_swords.vp_heal,
                13: Constants.T.double_bladed_sword.vp_heal
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.T.animal_heal)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BlairPassiveDualReinforceAttackDamage", values: Constants.T.dual_swords.additional_damage.base},
            {labelIntlID: "ToolTipType/BlairPassiveDualReinforceAttackApCoef", values: Constants.T.dual_swords.additional_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/BlairPassiveCombineReinforceAttackDamage", values: Constants.T.double_bladed_sword.additional_damage.base},
            {labelIntlID: "ToolTipType/BlairPassiveCombineReinforceAttackApCoef", values: Constants.T.double_bladed_sword.additional_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/BlairPassiveDualCoolDownReduce", values: Constants.T.dual_swords.cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/BlairPassiveCombineCoolDownReduce", values: Constants.T.double_bladed_sword.cooldown_reduction, percent: true}
        ]  
    })
}
