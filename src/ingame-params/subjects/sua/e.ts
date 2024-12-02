import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1028400;

const healMax = {
    base: Constants.E.heal.base.map(v => v * Constants.E.heal_max_multiplier),
    amp: Constants.E.heal.amp * Constants.E.heal_max_multiplier
}

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                2: RatioPercent(Constants.E.damage.amp),
                3: Constants.E.bookmark_damage.base,
                5: RatioPercent(Constants.E.bookmark_damage.amp),
                6: Constants.E.heal.base,
                8: RatioPercent(Constants.E.heal.amp),
                9: healMax,
                11: RatioPercent(healMax.amp),
                12: RatioPercent(Constants.E.cooldown_reduction),
                13: Constants.E.slow.duration,
                14: RatioPercent(Constants.E.slow.effect)
            }
        } else {   
            return {
                0: Constants.E.damage,
                1: Constants.E.bookmark_damage,
                2: Constants.E.heal,
                3: healMax,
                4: RatioPercent(Constants.E.cooldown_reduction),
                5: Constants.E.slow.duration,
                6: RatioPercent(Constants.E.slow.effect)
            }
        }
        
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.E.heal_max_hp)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.E.heal.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.E.bookmark_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
