import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1047100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.damage.base[skillLevel],
        1: `${Constants.T.damage.amp}%`,
        2: `${Constants.T.attack_speed}%`,
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base}
        ]  
    })
}
