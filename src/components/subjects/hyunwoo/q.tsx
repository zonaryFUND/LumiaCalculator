import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1007200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.damage.base[skillLevel],
        1: `${Constants.Q.damage.additionalAttack}%`,
        2: Constants.Q.slow.duration,
        3: `${Constants.Q.slow.effect}%`,
        4: `${Constants.Q.damage.amp}%`,
        5: Constants.Q.movement_speed.duration,
        6: `${Constants.Q.movement_speed.effect[skillLevel]}%`,
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
