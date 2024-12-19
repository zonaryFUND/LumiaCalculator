import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1078500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.R.duration,
                1: Constants.R.range,
                2: Constants.R.additional_damage.base,
                3: RatioPercent(Constants.R.additional_damage.additionalAttack),
                4: Constants.R.first_damage.base,
                5: RatioPercent(Constants.R.first_damage.additionalAttack),
                6: Constants.R.slow.duration,
                7: RatioPercent(Constants.R.slow.effect),
                8: RatioPercent(Constants.R.second_damage.additionalAttack),
                9: RatioPercent(Constants.R.second_damage.targetMaxHP),
                10: RatioPercent(Constants.R.execution_threshold)
            }
        } else {
            return {
                0: Constants.R.duration,
                1: Constants.R.range,
                2: Constants.R.additional_damage,
                3: Constants.R.first_damage,
                4: Constants.R.slow.duration,
                5: RatioPercent(Constants.R.slow.effect),
                6: Constants.R.second_damage,
                7: RatioPercent(Constants.R.second_damage.targetMaxHP),
                8: RatioPercent(Constants.R.execution_threshold)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/R1AdditionalAttackPower", values: Constants.R.additional_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/R2BaseDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/R2DirectDamageAttackPower", values: Constants.R.second_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
