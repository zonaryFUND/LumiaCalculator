import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1033300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.duration,
        1: RatioPercent(Constants.W.damage_reduction),
        2: Constants.W.e2_duration,
        3: Constants.W.damage,
        4: Constants.W.slow.duration,
        5: RatioPercent(Constants.W.slow.effect),
        10: Constants.W.damage.base,
        12: RatioPercent(Constants.W.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseReceiveDamageRatio", values: Constants.W.damage_reduction},
            {labelIntlID: "ToolTipType/CounterAttackDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
