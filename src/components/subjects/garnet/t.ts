import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1076100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.T.reduction.base,
                1: RatioPercent(Constants.T.reduction.amp),
                2: RatioPercent(Constants.T.reduction.maxHP)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.T.reduction
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/PreventBasicAttackDamaged", values: Constants.T.reduction.base}
        ]  
    })
}
