import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1006300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        1: Constants.W.second_time_bound,
        3: RatioPercent(Constants.W.movement_speed),
        4: Constants.W.vision,
        5: Constants.W.duration,
        6: RatioPercent(Constants.W.damage.additionalAttack),
        7: Constants.W.damage.base,
        9: RatioPercent(Constants.W.multiple_stepped_multipler),
        10: RatioPercent(Constants.W.attack_speed),
        11: RatioPercent(Constants.W.damage.amp),
        14: Constants.W.damage,
        15: RatioPercent(Constants.W.multiple_stepped_multipler)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TrapDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
