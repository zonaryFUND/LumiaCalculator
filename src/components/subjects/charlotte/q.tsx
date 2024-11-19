import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1073200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.duration,
        2: showEquation ? Constants.Q.damage.base[skillLevel] : Constants.Q.damage,
        3: Constants.Q.slow.duration,
        4: `${Constants.Q.slow.effect}%`,
        5: Constants.Q.slow.duration,
        6: `${Constants.Q.damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
        ]  
    })
}
