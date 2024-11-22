import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1010100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.threshold,
        1: 100,
        2: Constants.T.drunk_duration,
        3: showEquation ? `${Constants.T.damage.attack[skillLevel]}%` : Constants.T.damage,
        6: `${Constants.T.attack_speed}%`
    }),
    expansion: ({ config, status }) => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: [0,1,2].map(level => calculateValue(
                Constants.T.damage, 
                status,
                config,
                level
            ).static.floor().toString())},
        ]  
    })
}
