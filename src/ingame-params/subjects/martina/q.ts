import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        1: RatioPercent(Constants.Q.damage.attack),
        2: Constants.Q.cooldown_reduction,
        3: Constants.Q.movement_speed.duration,
        4: RatioPercent(Constants.Q.movement_speed.effect),
        6: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.Q.movement_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpTime", values: Constants.Q.movement_speed.duration},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
