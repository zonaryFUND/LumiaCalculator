import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1023300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.W.inner_damage.base : Constants.W.inner_damage,
        1: Constants.W.outer_damage,
        2: Constants.W.slow.duration,
        3: RatioPercent(Constants.W.slow.effect),
        4: Constants.W.slow.duration,
        5: Constants.W.outer_damage.base,
        8: RatioPercent(Constants.W.inner_damage.amp),
        9: RatioPercent(Constants.W.outer_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.inner_damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.W.outer_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
