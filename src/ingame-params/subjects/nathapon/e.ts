import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1034400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: Constants.E.slow.duration,
            3: RatioPercent(Constants.E.slow.effect),
            4: Constants.E.pull.from,
            5: Constants.E.pull.until,
            8: Constants.E.pull_basic_attack_range
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.E.first_damage.base,
                6: Constants.E.second_damage.base,
                10: RatioPercent(Constants.E.first_damage.amp),
                11: RatioPercent(Constants.E.second_damage.amp)
            }
        } else {   
            return {
                ...base,
                0: Constants.E.first_damage,
                1: Constants.E.second_damage,
            }
        }
        
    },
    expansion: () => ({
        tipValues: {
            0: Constants.E.mark_remain_range
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.first_damage.base},
            {labelIntlID: "ToolTipType/ReactivateDamage", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
