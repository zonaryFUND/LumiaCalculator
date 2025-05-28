import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1081500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.R.shield.base,
                1: RatioPercent(Constants.R.shield.amp),
                2: Constants.R.shield.stack,
                7: Constants.R.stun,
                8: Constants.R.inner_damage.base,
                9: RatioPercent(Constants.R.inner_damage.amp),
                10: Constants.R.extend,
                11: Constants.R.cc_immune,
                12: Constants.R.damage_threshold
            }
        } else {
            return {
                0: Constants.R.shield,
                1: Constants.R.shield.stack,
                4: Constants.R.stun,
                5: Constants.R.inner_damage,
                6: Constants.R.extend,
                7: Constants.R.cc_immune,
                8: Constants.R.damage_threshold
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.R.q_cooldown,
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.R.shield.base},
            {labelIntlID: "ToolTipType/StackShield", values: Constants.R.shield.stack},
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.inner_damage.base},
            {labelIntlID: "ToolTipType/NiahAcive1Cooldown", values: Constants.R.q_cooldown},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
