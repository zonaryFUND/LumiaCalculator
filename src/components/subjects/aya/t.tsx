import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1002100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.duration,
        1: showEquation ? Constants.T.shield.base[skillLevel] : Constants.T.shield,
        2: showEquation ? `${Constants.T.shield.attack}%` : Constants.T.cooldown_reduction,
        3: Constants.T.cooldown_reduction,
        4: `${Constants.T.shield.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
        ]  
    })
}
