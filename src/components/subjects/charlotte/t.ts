import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1073100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.ally_losthp_threshold),
        1: RatioPercent(Constants.T.heal_and_shield_amp),
        2: Constants.T.max_stack
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CharlottePassivestack", values: Constants.T.heal_and_shield_amp, percent: true}
        ]  
    })
}
