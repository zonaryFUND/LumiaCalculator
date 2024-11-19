import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1043500;

const maxCooldownIncrease = Constants.R.cooldown_increase * Constants.R.max_level;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        2: Constants.R.damage.base[skillLevel],
        6: Constants.R.slow.duration,
        7: `${Constants.R.slow.effect}%`,
        8: `${Constants.R.damage.amp}%`,
        9: Constants.R.cooldown_increase,
        10: maxCooldownIncrease,
        20: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
