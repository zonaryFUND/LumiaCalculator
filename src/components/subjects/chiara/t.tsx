import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1014100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.max_stack,
        1: Constants.T.duration,
        2: `${Constants.T.healing_reduction[skillLevel]}%`,
        3: `${Constants.T.movement_speed[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HpHealedDecreaseRatio", values: Constants.T.healing_reduction},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed}
        ]  
    })
}
