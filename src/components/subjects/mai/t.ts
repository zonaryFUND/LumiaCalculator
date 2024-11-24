import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1045100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.damage.defense)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DefenceIncreaseDamage", values: Constants.T.damage.defense, percent: true}
        ]  
    })
}
