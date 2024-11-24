import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1052100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ }) => ({
        0: Constants.T.duration,
        1: Constants.T.movement_speed.base,
        2: RatioPercent(Constants.T.movement_speed.amp),
        20: Constants.T.movement_speed
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.base}
        ]  
    })
}
