import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1050400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            3: Constants.E.stepsequence_cost
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.additionalMaxHP),
                4: RatioPercent(Constants.E.damage.amp),
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
