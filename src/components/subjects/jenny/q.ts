import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1038200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        2: Constants.Q.buff_duration,
        3: RatioPercent(Constants.Q.red_attack_speed),
        4: Constants.Q.max_stack,
        5: Constants.Q.buff_duration,
        6: RatioPercent(Constants.Q.black_movement_speed),
        7: Constants.Q.max_stack,
        8: Constants.Q.cooldown_reduction,
        10: RatioPercent(Constants.Q.damage.amp),
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
