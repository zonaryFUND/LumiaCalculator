import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3025000;

export const info: SkillTooltipProps = {
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
