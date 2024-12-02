import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1060500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.R.range,
            2: Constants.R.hit_slow.duration,
            3: RatioPercent(Constants.R.hit_slow.effect),
            6: RatioPercent(Constants.R.glass_additional_damage),
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.R.range,
                1: Constants.R.damage.base,
                4: RatioPercent(Constants.R.glass_additional_max),
                5: Constants.R.blast_damage.base,
                8: RatioPercent(Constants.R.damage.amp),
                10: RatioPercent(Constants.R.blast_damage.amp),
                11: RatioPercent(Constants.R.slow),
                12: Constants.R.duration
            }
        } else {   
            return {
                ...base,
                1: Constants.R.damage,
                5: Constants.R.blast_damage,
                7: RatioPercent(Constants.R.glass_additional_max),
                8: RatioPercent(Constants.R.slow),
                9: Constants.R.duration
            }
        }
        
    },
    expansion: () => ({
        tipValues: {
            0: Constants.Q.glass_duration,
            1: Constants.Q.knockback_immune
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ExplosionDamage", values: Constants.R.blast_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
