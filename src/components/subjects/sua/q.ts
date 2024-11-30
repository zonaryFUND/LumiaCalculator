import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1028200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: Constants.Q.stun
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.Q.damage.base,
                1: RatioPercent(Constants.Q.damage.amp),
                3: Constants.Q.bookmark_duration,
                4: Constants.Q.bookmark_damage.base,
                5: RatioPercent(Constants.Q.bookmark_damage.amp),
                8: RatioPercent(Constants.Q.center_multiplier),
                9: Constants.Q.slow.duration,
                10: RatioPercent(Constants.Q.slow.effect)
            }
        } else {   
            return {
                ...base,
                0: Constants.Q.damage,
                1: Constants.Q.bookmark_duration,
                3: Constants.Q.bookmark_damage,
                4: RatioPercent(Constants.Q.center_multiplier),
                5: Constants.Q.slow.duration,
                6: RatioPercent(Constants.Q.slow.effect)
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SuaSkill01BookMark", values: Constants.Q.bookmark_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
