import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1088500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base: TooltipValues = {
            0: RatioPercent(Constants.R.damage_reduction),
            1: Constants.R.duration,
            2: Constants.R.additional_max_hp.base[0]
        }

        if (showEquation) {
            return {
                ...base,
                3: Constants.R.damage.base,
                4: RatioPercent(Constants.R.damage.additionalAttack),
                5: RatioPercent(Constants.R.damage.targetMaxHP),
                6: Constants.R.slow.duration,
                7: RatioPercent(Constants.R.slow.effect),
                8: RatioPercent(Constants.R.center_amp)
            }
        } else {
            return {
                ...base,
                3: Constants.R.damage,
                4: RatioPercent(Constants.R.damage.targetMaxHP),
                5: Constants.R.slow.duration,
                6: RatioPercent(Constants.R.slow.effect),
                7: RatioPercent(Constants.R.center_amp)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "StatType/AddedHpAmount", values: Constants.R.additional_max_hp.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
