import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1007200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        1: RatioPercent(Constants.Q.damage.additionalAttack),
        2: Constants.Q.slow.duration,
        3: RatioPercent(Constants.Q.slow.effect),
        4: RatioPercent(Constants.Q.damage.amp),
        5: Constants.Q.movement_speed.duration,
        6: RatioPercent(Constants.Q.movement_speed.effect),
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.Q.movement_speed.effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
