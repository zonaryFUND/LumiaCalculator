import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1027200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.RangeQ.sp_cost
    },
    cooldown: Constants.RangeQ.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.RangeQ.damage.base[skillLevel],
        1: `${Constants.RangeQ.damage.attack}%`,
        2: Constants.RangeQ.attack_up.duration,
        3: Constants.RangeQ.attack_up.effect,
        4: Constants.RangeQ.attack_up.max_stack,
        5: `${Constants.common.q_stack_max_as}%`,
        20: Constants.RangeQ.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.RangeQ.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.RangeQ.cooldown},
        ]  
    })
}
