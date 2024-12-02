import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1069100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.T.duration,
                1: Constants.T.damage.base,
                2: Constants.T.damage.level,
                3: Constants.T.cooldown_reduction
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.T.duration,
                1: Constants.T.damage,
                2: Constants.T.cooldown_reduction
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.T.cooldown_reduction}
        ]  
    })
}
