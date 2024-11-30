import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1005100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.movement_speed.effect),
        1: Constants.T.damage.base,
        5: Constants.T.duration,
        6: Constants.T.movement_speed.duration,
        7: RatioPercent(Constants.T.damage.amp),
        8: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true}
        ]  
    })
}
