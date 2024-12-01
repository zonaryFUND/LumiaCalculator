import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1002100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.T.duration,
        1: showEquation ? Constants.T.shield.base : Constants.T.shield,
        2: showEquation ? RatioPercent(Constants.T.shield.attack) : Constants.T.cooldown_reduction,
        3: Constants.T.cooldown_reduction,
        4: RatioPercent(Constants.T.shield.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
        ]  
    })
}
