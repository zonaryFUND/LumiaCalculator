import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1073100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.T.ally_losthp_threshold}%`,
        1: `${Constants.T.heal_and_shield_amp[skillLevel]}%`,
        2: Constants.T.max_stack
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CharlottePassivestack", values: Constants.T.heal_and_shield_amp, percent: true}
        ]  
    })
}
