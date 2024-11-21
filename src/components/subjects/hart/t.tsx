import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1008100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.sp[skillLevel],
        1: Constants.T.damage,
        2: `${Constants.T.damage.attack[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SoundWaveDamageApCoef", values: Constants.T.damage.attack, percent: true},
            {labelIntlID: "ToolTipType/SpHeal", values: Constants.T.sp}
        ]  
    })
}
