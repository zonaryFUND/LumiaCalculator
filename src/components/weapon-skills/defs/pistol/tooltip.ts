import { RatioPercent } from "components/tooltip/skill/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";

export const code = 3009000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.duration,
        1: Constants.attack_speed.count,
        2: RatioPercent(Constants.attack_speed.effect),
        3: RatioPercent(Constants.movement_speed),
        4: RatioPercent(Constants.movement_speed.base),
        5: RatioPercent(Constants.movement_speed.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/MoveSpeed", values: Constants.movement_speed.base, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
