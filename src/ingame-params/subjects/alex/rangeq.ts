import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1027200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.RangeQ.sp_cost
    },
    cooldown: Constants.RangeQ.cooldown,
    values: ({ }) => ({
        0: Constants.RangeQ.damage.base,
        1: RatioPercent(Constants.RangeQ.damage.attack),
        2: Constants.RangeQ.attack_up.duration,
        3: Constants.RangeQ.attack_up.effect,
        4: Constants.RangeQ.attack_up.max_stack,
        5: RatioPercent(Constants.common.q_stack_max_as),
        20: Constants.RangeQ.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.RangeQ.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.RangeQ.cooldown},
        ]  
    })
}
