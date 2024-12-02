import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";

export const code = 1011100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.damage.base    
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TrueDamage", values: Constants.T.damage.base}
        ]  
    })
}
