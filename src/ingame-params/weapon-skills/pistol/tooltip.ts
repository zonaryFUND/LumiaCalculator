import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3009000;

export const info: SkillTooltipProps = {
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
