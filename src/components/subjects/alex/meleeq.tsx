import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1027600;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.MeleeQ.sp_cost
    },
    cooldown: Constants.MeleeQ.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.MeleeQ.damage.base[skillLevel],
        1: `${Constants.MeleeQ.damage.attack}%`,
        2: Constants.MeleeQ.attack_up.duration,
        3: Constants.MeleeQ.attack_up.effect,
        4: Constants.MeleeQ.attack_up.max_stack,
        5: `${Constants.common.q_stack_max_as}%`,
        20: Constants.MeleeQ.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.MeleeQ.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.MeleeQ.cooldown},
        ]  
    })
}
