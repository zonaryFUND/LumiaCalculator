import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1011100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ }) => ({
        0: Constants.T.damage.base    
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TrueDamage", values: Constants.T.damage.base}
        ]  
    })
}
