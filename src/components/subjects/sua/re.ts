import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1028530;

const healMax = {
    base: Constants.RE.heal.base.map(v => v * Constants.RE.heal_max_multiplier),
    amp: Constants.RE.heal.amp * Constants.RE.heal_max_multiplier
}

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.RE.damage.base,
                2: RatioPercent(Constants.RE.damage.amp),
                3: Constants.RE.bookmark_damage.base,
                5: RatioPercent(Constants.RE.bookmark_damage.amp),
                6: Constants.RE.heal.base,
                8: RatioPercent(Constants.RE.heal.amp),
                9: healMax,
                11: RatioPercent(healMax.amp),
                12: RatioPercent(Constants.RE.cooldown_reduction),
                13: Constants.RE.slow.duration,
                14: RatioPercent(Constants.RE.slow.effect)
            }
        } else {   
            return {
                0: Constants.RE.damage,
                1: Constants.RE.bookmark_damage,
                2: Constants.RE.heal,
                3: healMax,
                4: RatioPercent(Constants.RE.cooldown_reduction),
                5: Constants.RE.slow.duration,
                6: RatioPercent(Constants.RE.slow.effect)
            }
        }
        
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.RE.heal_max_hp)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.RE.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.RE.heal.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.RE.bookmark_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
