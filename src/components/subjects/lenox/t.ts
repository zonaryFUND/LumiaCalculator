import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1020100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? RatioPercent(Constants.T.shield.maxHP) : Constants.T.shield,
        1: Constants.T.duration,
        5: Constants.T.cooldown.constant
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.T.fishing.common),
            1: RatioPercent(Constants.T.fishing.uncommon),
            2: RatioPercent(Constants.T.fishing.rare)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.maxHP, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
