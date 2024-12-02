import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1018500;

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
                0: Constants.R.damage.base,
                2: Constants.R.slow.duration,
                3: Constants.R.knife_damage.base,
                5: RatioPercent(Constants.R.slow.effect),
                6: RatioPercent(Constants.R.damage.amp),
                7: RatioPercent(Constants.R.knife_damage.amp)
            }
        } else {   
            return {
                0: Constants.R.damage,
                1: Constants.R.slow.duration,
                2: RatioPercent(Constants.R.slow.effect),
                3: Constants.R.knife_damage
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/DaggerDamage", values: Constants.R.knife_damage.base}
        ]  
    })
}
