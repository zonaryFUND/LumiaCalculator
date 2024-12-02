import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1041300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.duration,
        1: RatioPercent(Constants.W.slow),
        2: RatioPercent(Constants.W.attack_speed),
        3: Constants.W.effect_remain,
        4: RatioPercent(Constants.W.cooldown_reduction),
        7: RatioPercent(Constants.W.mastery_addition)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.W.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
