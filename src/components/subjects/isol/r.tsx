import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1009500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    charge: Constants.R.charge,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: Constants.R.lifetime
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.R.damage.base[skillLevel],
                2: `${Constants.R.damage.attack}%`,
                3: `${Constants.R.damage.amp}%`,
                4: Constants.R.charge.max,
                5: Constants.R.max_place,
                6: `${Constants.R.damage.targetHP}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.R.damage,
                2: Constants.R.charge.max,
                3: Constants.R.max_place,
                4: `${Constants.R.damage.targetHP}%`
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
