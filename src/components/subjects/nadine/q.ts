import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1006200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.cast,
        1: Constants.Q.max_range,
        2: RatioPercent(Constants.Q.movement_speed_penalty),
        3: Constants.Q.min_damage.base,
        4: Constants.Q.max_damage.base,
        5: RatioPercent(Constants.Q.min_damage.additionalAttack),
        6: RatioPercent(Constants.Q.max_damage.additionalAttack),
        8: Constants.Q.max_range_on_some_stack.threshold,
        9: Constants.Q.max_range_on_some_stack.value,
        12: RatioPercent(Constants.Q.min_damage.amp),
        13: RatioPercent(Constants.Q.max_damage.amp),
        14: Constants.Q.min_damage,
        15: Constants.Q.max_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.Q.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.Q.max_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
