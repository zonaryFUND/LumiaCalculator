import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1009500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    charge: Constants.R.charge,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.R.lifetime
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.R.damage.base,
                2: RatioPercent(Constants.R.damage.attack),
                3: RatioPercent(Constants.R.damage.amp),
                4: Constants.R.charge.max,
                5: Constants.R.max_place,
                6: RatioPercent(Constants.R.damage.targetHP)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.R.damage,
                2: Constants.R.charge.max,
                3: Constants.R.max_place,
                4: RatioPercent(Constants.R.damage.targetHP)
            } as Record<number, number | string | ValueRatio>
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.R.charge.time}
        ]  
    })
}
