import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1038200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.damage.base[skillLevel],
        2: Constants.Q.buff_duration,
        3: `${Constants.Q.red_attack_speed}%`,
        4: Constants.Q.max_stack,
        5: Constants.Q.buff_duration,
        6: `${Constants.Q.black_movement_speed}%`,
        7: Constants.Q.max_stack,
        8: Constants.Q.cooldown_reduction,
        10: `${Constants.Q.damage.amp}%`,
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
