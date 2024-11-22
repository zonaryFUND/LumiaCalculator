import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1010400;

export const info: TooltipInfo = {
    skill: "E",
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.slow.duration,
        1: Constants.E.damage.base[skillLevel],
        2: `${Constants.E.damage.attack}%`,
        4: `${Constants.E.slow.effect[skillLevel]}%`,
        6: `${Constants.E.slow.enhanced_effect[skillLevel]}%`,
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.E.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/FettedDecreaseMoveRatio", values: Constants.E.slow.enhanced_effect, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
