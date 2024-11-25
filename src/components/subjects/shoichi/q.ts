import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1018200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                2: Constants.Q.cooldown_reduction,
                3: Constants.Q.enhance_duration,
                4: RatioPercent(Constants.Q.damage.amp)
            }
        } else {   
            return {
                0: Constants.Q.damage,
                1: Constants.Q.cooldown_reduction,
                2: Constants.Q.enhance_duration
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
