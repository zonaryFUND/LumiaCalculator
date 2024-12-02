import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1028300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.W.shield_duration,
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.W.shield.base,
                3: Constants.W.damage.base,
                4: RatioPercent(Constants.W.damage.amp),
                5: Constants.W.blind_duration,
                6: RatioPercent(Constants.W.shield.amp)
            }
        } else {   
            return {
                ...base,
                1: Constants.W.shield,
                2: Constants.W.damage,
                3: Constants.W.blind_duration
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/BlindDuration", values: Constants.W.blind_duration},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
