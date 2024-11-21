import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1050400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            3: Constants.E.stepsequence_cost
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.E.damage.base[skillLevel],
                1: `${Constants.E.damage.additionalMaxHP}%`,
                4: `${Constants.E.damage.amp}%`,
                6: Constants.E.stepsequence_recovery,
                7: Constants.E.stepsequence_recovery_on_ice
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.E.damage,
                4: Constants.E.stepsequence_recovery,
                5: Constants.E.stepsequence_recovery_on_ice
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base}
        ]  
    })
}
