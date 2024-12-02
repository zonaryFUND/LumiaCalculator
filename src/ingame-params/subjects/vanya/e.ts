import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1064400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.inner_damage,
        1: Constants.E.outer_damage,
        2: Constants.E.slow.duration,
        3: RatioPercent(Constants.E.slow.effect),
        10: Constants.E.inner_damage.base,
        11: RatioPercent(Constants.E.inner_damage.amp),
        12: Constants.E.outer_damage.base,
        13: RatioPercent(Constants.E.outer_damage.amp)
    }),
    expansion: () => ({
        tipValues: {
            1: Constants.E.max_cast_time
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/InnerDamage", values: Constants.E.inner_damage.base},
            {labelIntlID: "ToolTipType/OuterDamage", values: Constants.E.outer_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
