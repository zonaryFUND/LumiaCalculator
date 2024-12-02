import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1070300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.ms_duration,
        1: RatioPercent(Constants.W.movement_speed),
        2: Constants.W.as_duration,
        3: RatioPercent(Constants.W.attack_speed)
    }),
    expansion: () => ({
        tipValues: {
            0: Constants.W.cooldown_reduction
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.W.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.W.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
