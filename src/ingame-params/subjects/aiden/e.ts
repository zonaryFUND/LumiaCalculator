import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1046400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.damage.base,
        1: RatioPercent(Constants.E.damage.attack),
        2: Constants.E.movement_speed.duration,
        3: RatioPercent(Constants.E.movement_speed.effect),
        4: Constants.E.rush_damage.base,
        5: RatioPercent(Constants.E.rush_damage.attack),
        20: Constants.E.damage,
        21: Constants.E.rush_damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BackstepDamage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.E.movement_speed.effect},
            {labelIntlID: "ToolTipType/VoltrushDamage", values: Constants.E.rush_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
