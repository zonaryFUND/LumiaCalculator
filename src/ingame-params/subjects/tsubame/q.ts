import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1070200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: Constants.Q.slow_duration,
            2: RatioPercent(Constants.Q.slow),
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.Q.damage.base,
                3: RatioPercent(Constants.Q.damage.attack),
                4: Constants.Q.additional_stack
            }
        } else {   
            return {
                ...base,
                0: Constants.Q.damage,
                3: Constants.Q.additional_stack
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
