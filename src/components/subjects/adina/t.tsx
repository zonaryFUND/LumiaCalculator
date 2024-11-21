import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1052100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ showEquation, skillLevel, config }) => ({
        0: Constants.T.duration,
        1: Constants.T.movement_speed.base[skillLevel],
        2: `${Constants.T.movement_speed.amp}%`,
        20: Constants.T.movement_speed
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.base}
        ]  
    })
}
