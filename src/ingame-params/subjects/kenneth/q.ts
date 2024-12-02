import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1071200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                1: RatioPercent(Constants.Q.damage.attack),
                2: RatioPercent(Constants.Q.max_stack_damage),
                3: RatioPercent(Constants.Q.max_stack_heal),
                4: RatioPercent(Constants.Q.max_stack_heal_max)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.damage,
                1: RatioPercent(Constants.Q.max_stack_damage),
                2: RatioPercent(Constants.Q.max_stack_heal),
                3: RatioPercent(Constants.Q.max_stack_heal_max)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.Q.damage.attack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
