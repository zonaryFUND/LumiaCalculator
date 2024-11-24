import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1030100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.heal.targetMaxHP),
        2: Constants.T.amount
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HealBurger", values: Constants.T.heal.targetMaxHP, percent: true}
        ]  
    })
}
