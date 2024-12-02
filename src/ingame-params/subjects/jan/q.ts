import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1035200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: Constants.Q.slow.duration,
            3: RatioPercent(Constants.Q.slow.effect),
            4: Constants.Q.defense_reduction.duration,
            5: RatioPercent(Constants.Q.defense_reduction.effect),
            10: Constants.Q.airborne
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.Q.damage.base,
                1: RatioPercent(Constants.Q.damage.additionalAttack),
                6: RatioPercent(Constants.Q.damage.amp),
                7: Constants.Q.Q2_damage.base,
                8: RatioPercent(Constants.Q.Q2_damage.additionalAttack),
                9: RatioPercent(Constants.Q.Q2_damage.amp),
                11: RatioPercent(Constants.Q.damage.targetMaxHP),
                12: RatioPercent(Constants.Q.Q2_damage.targetMaxHP)

            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                11: Constants.Q.damage,
                12: Constants.Q.Q2_damage,
                13: RatioPercent(Constants.Q.damage.targetMaxHP),
                14: RatioPercent(Constants.Q.Q2_damage.targetMaxHP)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.Q2_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
