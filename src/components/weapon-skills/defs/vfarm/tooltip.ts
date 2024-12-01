import { RatioPercent } from "components/tooltip/skill/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";

export const code = 3025000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: 50,
        1: Constants.charge_gauge,
        2: Constants.gauge_consumption,
        3: RatioPercent(Constants.cooldown_reduction),
        4: Constants.movement_speed.duration,
        5: RatioPercent(Constants.movement_speed.effect),
        6: Constants.extend,
        7: RatioPercent(Constants.cooldown_reduction),
        8: Constants.movement_speed.duration,
        9: RatioPercent(Constants.movement_speed.effect),
        10: Constants.overload_reduction
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/VFOveraddTime", values: Constants.extend},
            {labelIntlID: "ToolTipType/VFOverloadDecreaseTime", values: Constants.overload_reduction}
        ]  
    })
}
