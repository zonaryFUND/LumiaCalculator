import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1028510;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: Constants.RQ.stun
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.RQ.damage.base,
                1: RatioPercent(Constants.RQ.damage.amp),
                3: Constants.RQ.bookmark_duration,
                4: Constants.RQ.bookmark_damage.base,
                5: RatioPercent(Constants.RQ.bookmark_damage.amp),
                8: RatioPercent(Constants.RQ.center_multiplier),
                9: Constants.RQ.slow.duration,
                10: RatioPercent(Constants.RQ.slow.effect)
            }
        } else {   
            return {
                ...base,
                0: Constants.RQ.damage,
                1: Constants.RQ.bookmark_duration,
                3: Constants.RQ.bookmark_damage,
                4: RatioPercent(Constants.RQ.center_multiplier),
                5: Constants.RQ.slow.duration,
                6: RatioPercent(Constants.RQ.slow.effect)
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.RQ.damage.base},
            {labelIntlID: "ToolTipType/SuaSkill01BookMark", values: Constants.RQ.bookmark_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.RQ.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
