import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1046400;

export const info: TooltipProps = {
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
