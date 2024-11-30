import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1028520;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.RW.shield_duration,
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.RW.shield.base,
                3: Constants.RW.damage.base,
                4: RatioPercent(Constants.RW.damage.amp),
                5: Constants.RW.blind_duration,
                6: RatioPercent(Constants.RW.shield.amp)
            }
        } else {   
            return {
                ...base,
                1: Constants.RW.shield,
                2: Constants.RW.damage,
                3: Constants.RW.blind_duration
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.RW.shield.base},
            {labelIntlID: "ToolTipType/Damage", values: Constants.RW.damage.base},
            {labelIntlID: "ToolTipType/BlindDuration", values: Constants.RW.blind_duration},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
