import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1060100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: Constants.T.collection_duration
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.T.damage.base,
                2: RatioPercent(Constants.T.damage.amp)
            }
        } else {   
            return {
                ...base,
                0: Constants.T.damage,
            }
        }
        
    },
    expansion: () => ({
        tipValues: {
            0: Constants.Q.glass_duration,
            1: Constants.Q.knockback_immune
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
