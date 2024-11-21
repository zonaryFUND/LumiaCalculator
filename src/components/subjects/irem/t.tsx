import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1061100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.vision[skillLevel],
        1: Constants.T.stay,
        2: `${Constants.T.attack_speed[skillLevel]}%`,
        3: Constants.T.defense[skillLevel],
        4: `${Constants.T.fish_food}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SightRange", values: Constants.T.vision}
        ]  
    })
}
