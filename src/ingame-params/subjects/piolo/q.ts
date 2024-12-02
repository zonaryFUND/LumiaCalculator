import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1056200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.Q1.damage.base,
                2: RatioPercent(Constants.Q1.damage.amp),
                3: Constants.Q1.enhanced_damage.base,
                5: RatioPercent(Constants.Q1.enhanced_damage.amp),
                6: Constants.Q2.center_damage.base,
                8: RatioPercent(Constants.Q2.center_damage.amp),
                9: Constants.Q2.slow.duration,
                10: RatioPercent(Constants.Q2.slow.effect),
                11: Constants.Q2.outer_damage.base,
                13: RatioPercent(Constants.Q2.outer_damage.amp)
            }
        } else {
            return {
                1: Constants.Q1.damage,
                2: Constants.Q1.enhanced_damage,
                3: Constants.Q2.center_damage,
                4: Constants.Q2.slow.duration,
                5: RatioPercent(Constants.Q2.slow.effect),
                6: Constants.Q2.outer_damage
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.Q1.movement_speed_penalty
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Piolo_Q1_Damage", values: Constants.Q1.damage.base},
            {labelIntlID: "ToolTipType/Piolo_Q1_ReinforceDamage", values: Constants.Q1.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Piolo_Q2_CenterDamage", values: Constants.Q2.center_damage.base},
            {labelIntlID: "ToolTipType/Piolo_Q2_Damage", values: Constants.Q2.outer_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
