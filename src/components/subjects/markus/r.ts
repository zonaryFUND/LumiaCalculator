import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1053500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: Constants.R.slow.duration,
            3: RatioPercent(Constants.R.slow.effect),
            4: Constants.R.tectonic_rift
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.R.damage.base,
                1: RatioPercent(Constants.R.damage.attack),
                7: Constants.R.defense_down.duration,
                8: Constants.R.defense_down.duration,
                9: RatioPercent(Constants.R.defense_down.effect)
            }
        } else {
            return {
                ...base,
                0: Constants.R.damage,

                4: Constants.R.tectonic_rift,
                5: Constants.R.cooldown_reduction,
                6: Constants.R.defense_down.duration,
                7: RatioPercent(Constants.R.defense_down.effect)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
