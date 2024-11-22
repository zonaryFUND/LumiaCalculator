import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1035100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.threshold,
        4: `${Constants.T.cooldown_reduction[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.T.cooldown_reduction, percent: true}
        ]  
    })
}
