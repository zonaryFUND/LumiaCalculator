import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1030100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.T.heal.targetMaxHP[skillLevel]}%`,
        2: Constants.T.amount
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HealBurger", values: Constants.T.heal.targetMaxHP, percent: true}
        ]  
    })
}
