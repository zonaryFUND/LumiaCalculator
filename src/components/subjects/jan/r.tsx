import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1035500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.duration,
        1: Constants.R.damage.base[skillLevel],
        2: `${Constants.R.damage.additionalAttack}%`,
        3: Constants.R.slow.duration,
        4: `${Constants.R.slow.effect}%`,
        6: Constants.R.kill_stack,
        7: Constants.R.movement_speed.duration,
        8: `${Constants.R.movement_speed.effect}%`,
        10 : `${Constants.R.damage.amp}%`,
        11: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
