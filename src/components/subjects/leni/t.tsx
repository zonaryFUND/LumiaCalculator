import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1069100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, config, status }) => {
        if (showEquation) {
            return {
                0: Constants.T.duration,
                1: Constants.T.damage.base[skillLevel],
                2: Constants.T.damage.level,
                3: Constants.T.cooldown_reduction[skillLevel]
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.T.duration,
                1: Constants.T.damage,
                2: Constants.T.cooldown_reduction[skillLevel]
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
