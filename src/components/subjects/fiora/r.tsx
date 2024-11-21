import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1003500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        1: Constants.R.damage.base[skillLevel],
        9: Constants.R.slow.duration,
        10: `${Constants.R.slow.effect}%`,
        12: `${Constants.R.damage.amp}%`,
        13: Constants.R.damage,
        14: Constants.R.finish_damage,
        15: Constants.R.stun,
        16: Constants.R.finish_damage.base[skillLevel],
        17: `${Constants.R.finish_damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FioraActive4FirstSecondDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/FioraActive4ThirdDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
