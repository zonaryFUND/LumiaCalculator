import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1087500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.R.untargetable,
        1: Constants.R.movement_speed.duration,
        2: RatioPercent(Constants.R.movement_speed.effect),
        3: RatioPercent(Constants.R.e_cooldown_reduction),
        4: RatioPercent(Constants.R.qw_cooldown_reduction),
        5: RatioPercent(Constants.R.cooldown_reduction),
        6: Constants.R.basic_attack_enhancement.duration,
        7: Constants.R.basic_attack_enhancement.additional_damage,
        8: Constants.R.basic_attack_enhancement.range,
        20: Constants.R.basic_attack_enhancement.additional_damage.base,
        21: RatioPercent(Constants.R.basic_attack_enhancement.additional_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.basic_attack_enhancement.additional_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
