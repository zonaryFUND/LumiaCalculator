import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1037100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.T.vision[skillLevel]}%`,
        1: `${Constants.T.movement_speed[skillLevel]}%`
    }), 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SightRange", values: Constants.T.vision, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true},
        ]  
    })
}
