import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1088100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        const base: TooltipValues = {
            0: Constants.T.basic_attack_divine_power,
            1: Constants.T.skill_divine_power,
            2: Constants.T.duration
        }

        if (showEquation) {
            return {
                ...base,
                3: Constants.T.damage.base,
                4: RatioPercent(Constants.T.damage.additionalAttack),
                5: RatioPercent(Constants.T.damage.targetMaxHP),
                6: RatioPercent(Constants.T.slow_resistance)
            }
        } else {
            return {
                ...base,
                3: Constants.T.damage,
                4: RatioPercent(Constants.T.damage.targetMaxHP),
                5: RatioPercent(Constants.T.slow_resistance)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/TargetMaxHpCoef", values: Constants.T.damage.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/SlowResistRatio", values: Constants.T.slow_resistance, percent: true},
        ]  
    })
}
