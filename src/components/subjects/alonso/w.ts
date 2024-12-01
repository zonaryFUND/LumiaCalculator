import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1068300;

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
        2: Constants.W.waves,
        3: Constants.W.damage,
        4: Constants.W.final_damage,
        10: Constants.W.damage.base,
        11: RatioPercent(Constants.W.damage.amp),
        12: RatioPercent(Constants.W.damage.additionalMaxHP),
        13: Constants.W.final_damage.base,
        14: RatioPercent(Constants.W.final_damage.amp),
        15: RatioPercent(Constants.W.final_damage.additionalMaxHP)
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.W.self_slow)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AlonsoActive2ProjectileDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/AlonsoActive2FinishDamage", values: Constants.W.final_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
