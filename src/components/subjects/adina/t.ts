import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1052100;

export const info: TooltipProps = {
    skillKey: "T",
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
