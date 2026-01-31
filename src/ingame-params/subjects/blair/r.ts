import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.R.duration,
            1: Constants.R.vp_regen,
            2: `${Constants.R.detect_range}m`,
            3: `${Constants.R.undetect_range}m`,
            4: Constants.R.duration
        }   
        if (showEquation) {
            return {
                ...base,
                5: Constants.R.damage.base,
                6: RatioPercent(Constants.R.damage.additionalAttack),
                7: Constants.R.damage.gauge,
                8: Constants.R.vp_heal,
                9: RatioPercent(Constants.R.attack_speed)
            }
        } else {
            return {
                ...base,
                5: Constants.R.damage,
                6: Constants.R.damage.gauge,
                7: Constants.R.vp_heal,
                8: RatioPercent(Constants.R.attack_speed)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.R.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/BlairActive4VpRecovery", values: Constants.R.vp_heal},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
