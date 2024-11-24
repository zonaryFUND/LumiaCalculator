import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1074100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: Constants.T.defense.duration,
        1: RatioPercent(Constants.T.defense.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.T.defense.effect, percent: true}
        ]  
    })
}
