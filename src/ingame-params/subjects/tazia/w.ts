import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1060300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.W.stun,
            2: Constants.W.duration
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.W.damage.base,
                4: RatioPercent(Constants.W.damage.amp)
            }
        } else {   
            return {
                ...base,
                1: Constants.W.damage
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/StunTime", values: Constants.W.stun},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
