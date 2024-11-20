import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1040200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.Q.damage.base[skillLevel],
        1: `${Constants.Q.damage.ninaAttack}%`,
        4: `${Constants.Q.slow.effect[skillLevel]}%`,
        5: Constants.Q.slow.duration,
        7: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DamageNina", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedDown", values: Constants.Q.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
