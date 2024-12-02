import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1037100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.vision),
        1: RatioPercent(Constants.T.movement_speed)
    }), 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SightRange", values: Constants.T.vision, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true},
        ]  
    })
}
