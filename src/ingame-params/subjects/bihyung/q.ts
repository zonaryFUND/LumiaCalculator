import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1088200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.Q.first_damage.base,
                1: RatioPercent(Constants.Q.first_damage.attack),
                2: RatioPercent(Constants.Q.first_heal.maxHP),
                3: Constants.Q.reuse_after,
                4: Constants.Q.reuse_duration,
                5: RatioPercent(Constants.Q.reuse_chase_damage.basic_attack_damage.attack),
                6: Constants.Q.reuse_chase_damage.skill_damage.base,
                7: RatioPercent(Constants.Q.reuse_chase_damage.skill_damage.attack),
                8: RatioPercent(Constants.Q.reuse_heal.maxHP),
                9: RatioPercent(Constants.Q.additional_area_damage),
                10: `${Constants.Q.additional_damage_area}m`
            }
        } else {
            return {
                0: Constants.Q.first_damage,
                1: Constants.Q.first_heal,
                2: Constants.Q.reuse_after,
                3: Constants.Q.reuse_duration,
                4: Constants.Q.reuse_chase_damage.basic_attack_damage,
                5: Constants.Q.reuse_chase_damage.skill_damage,
                6: Constants.Q.reuse_heal,
                7: RatioPercent(Constants.Q.additional_area_damage),
                8: `${Constants.Q.additional_damage_area}m`
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BihyungQ1Damage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/BihyungQ1DamageApCoef", values: Constants.Q.first_damage.attack, percent: true},
            {labelIntlID: "ToolTipType/BihyungQ1HealHpRatioCoef", values: Constants.Q.first_heal.maxHP, percent: true},
            {labelIntlID: "ToolTipType/BihyungQ2Damage", values: Constants.Q.reuse_chase_damage.skill_damage.base},
            {labelIntlID: "ToolTipType/BihyungQ2DamageApCoef", values: Constants.Q.reuse_chase_damage.skill_damage.attack, percent: true},
            {labelIntlID: "ToolTipType/BihyungQ2HealHpRatioCoef", values: Constants.Q.reuse_heal.maxHP, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
