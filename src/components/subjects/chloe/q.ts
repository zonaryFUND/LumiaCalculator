import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1040200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        1: RatioPercent(Constants.Q.damage.ninaAttack),
        4: RatioPercent(Constants.Q.slow.effect),
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
