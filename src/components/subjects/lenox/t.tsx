import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1020100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? `${Constants.T.shield.maxHP[skillLevel]}%` : Constants.T.shield,
        1: Constants.T.duration,
        5: Constants.T.cooldown.constant[skillLevel]
    }),
    expansion: () => ({
        tipValues: {
            0: `${Constants.T.fishing.common}%`,
            1: `${Constants.T.fishing.uncommon}%`,
            2: `${Constants.T.fishing.rare}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.maxHP, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
