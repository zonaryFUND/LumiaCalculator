import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1077100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.movement_speed),
        1: Constants.T.shield_duration,
        2: Constants.T.shield.base,
        3: RatioPercent(Constants.T.shield.amp),
        20: Constants.T.shield
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base}
        ]  
    })
}
