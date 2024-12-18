import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1034300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: RatioPercent(Constants.W.slow),
            5: Constants.W.bind
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.W.damage.base,
                3: Constants.W.finish_damage.base,
                7: RatioPercent(Constants.W.finish_damage),
                8: RatioPercent(Constants.W.damage.amp)
            }
        } else {   
            return {
                ...base,
                0: Constants.W.damage,
                1: Constants.W.finish_damage
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.W.finish_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
