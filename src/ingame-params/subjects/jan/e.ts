import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1035400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            2: RatioPercent(Constants.E.heal.min),
            3: RatioPercent(Constants.E.heal.max),
            4: RatioPercent(Constants.E.cooldown_reduction)
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.additionalAttack),
                5: RatioPercent(Constants.E.damage.amp),
                6: RatioPercent(Constants.E.damage.targetMaxHP)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                6: Constants.E.damage,
                7: RatioPercent(Constants.E.damage.targetMaxHP)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
