import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1074100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.defense.duration,
        1: `${Constants.T.defense.effect[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.T.defense.effect, percent: true}
        ]  
    })
}
