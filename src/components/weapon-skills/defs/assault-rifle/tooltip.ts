import { RatioPercent } from "components/tooltip/skill/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 3010000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }) => ({
        0: Constants.stack_gain,
        1: Constants.max_stack,
        2: 1,
        3: Constants.stack_reduction,
        5: RatioPercent(Constants.attack_speed),
        6: Constants.stack_reduction_threshold,
        8: Constants.max_stack.map(v => v * Constants.per_stack.duration),
        9: Constants.max_stack.map(v => v * Constants.per_stack.basic_attack_addition)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackSpeed", values: Constants.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/MaxOverheat", values: Constants.max_stack}
        ]  
    })
}
