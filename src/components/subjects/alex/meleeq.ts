import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1027600;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.MeleeQ.sp_cost
    },
    cooldown: Constants.MeleeQ.cooldown,
    values: ({ }) => ({
        0: Constants.MeleeQ.damage.base,
        1: RatioPercent(Constants.MeleeQ.damage.attack),
        2: Constants.MeleeQ.attack_up.duration,
        3: Constants.MeleeQ.attack_up.effect,
        4: Constants.MeleeQ.attack_up.max_stack,
        5: RatioPercent(Constants.common.q_stack_max_as),
        20: Constants.MeleeQ.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.MeleeQ.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.MeleeQ.cooldown},
        ]  
    })
}
