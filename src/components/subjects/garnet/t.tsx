import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1076100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.T.reduction.base[skillLevel],
                1: `${Constants.T.reduction.amp}%`,
                2: `${Constants.T.reduction.maxHP}%`
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
