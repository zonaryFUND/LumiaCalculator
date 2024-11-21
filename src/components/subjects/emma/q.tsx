import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1019200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.damage.base[skillLevel],
        3: Constants.Q.duration,
        4: `${Constants.Q.cooldown_reduction}%`,
        5: Constants.Q.slow.duration,
        6: `${Constants.Q.slow.effect}%`,
        9: `${Constants.Q.damage.amp}%`,
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
