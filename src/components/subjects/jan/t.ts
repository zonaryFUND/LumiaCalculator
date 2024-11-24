import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1035100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ }) => ({
        0: Constants.T.threshold,
        4: RatioPercent(Constants.T.cooldown_reduction)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.T.cooldown_reduction, percent: true}
        ]  
    })
}
