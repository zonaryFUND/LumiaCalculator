import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1025400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.duration,
        1: Constants.E.vision,
        2: Constants.E.marking_period,
        3: Constants.E.mark_duration,
        4: Constants.E.q_cooldown_reduction,
        5: Constants.E.r_cooldown_reduction,
        6: RatioPercent(Constants.E.movement_speed),
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SightRange", values: Constants.E.vision},
            {labelIntlID: "ToolTipType/ChaseMoveSpeed", values: Constants.E.movement_speed},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
        ]  
    })
}
