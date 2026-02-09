import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1082500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.R.damage.base,
                1: RatioPercent(Constants.R.damage.attack),
                2: Constants.R.duration,
                3: Constants.R.additional_damage.base,
                4: RatioPercent(Constants.R.additional_damage.attack),
                5: Constants.R.enhance_count,
                6: Constants.R.enhance_damage.base,
                7: RatioPercent(Constants.R.enhance_damage.attack),
                8: Constants.R.slow.duration,
                9: RatioPercent(Constants.R.slow.effect),
                10: Constants.R.e_chase_damage.base,
                11: RatioPercent(Constants.R.e_chase_damage.base),
                12: RatioPercent(Constants.R.second_chase_decline)
            }
        } else {
            return {
                0: Constants.R.damage,
                1: Constants.R.duration,
                2: Constants.R.additional_damage,
                3: Constants.R.enhance_count,
                4: Constants.R.enhance_damage,
                5: Constants.R.slow.duration,
                6: RatioPercent(Constants.R.slow.effect),
                7: Constants.R.e_chase_damage,
                8: RatioPercent(Constants.R.second_chase_decline)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base },
            { labelIntlID: "ToolTipType/XuelinActive3Damage", values: Constants.R.additional_damage.base },
            { labelIntlID: "ToolTipType/XuelinActive3DamageApCoef", values: Constants.R.additional_damage.attack, percent: true },
            { labelIntlID: "ToolTipType/XuelinActive4ReinforceSwordDamage", values: Constants.R.enhance_damage.base },
            { labelIntlID: "ToolTipType/XuelinActive4ReinforceSwordDamageApCoef", values: Constants.R.enhance_damage.attack, percent: true },
            { labelIntlID: "ToolTipType/XuelinActive4ReturnDamage", values: Constants.R.e_chase_damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]
    })
}
