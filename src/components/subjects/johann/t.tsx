import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1041100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, status, config }) => ({
        0: `${Constants.T.tenacity[skillLevel]}%`,
        1: Constants.T.tenacity_ally.duration,
        2: `${Constants.T.tenacity_ally.effect[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/JohannTenacity", values: Constants.T.tenacity, percent: true},
            {labelIntlID: "ToolTipType/JohannAllyTenacity", values: Constants.T.tenacity_ally.effect, percent: true}
        ]  
    })
}
