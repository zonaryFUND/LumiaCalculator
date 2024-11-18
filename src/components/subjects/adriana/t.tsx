import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1017100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        8: Constants.T.duration,
        9: `${Constants.T.defense_reduction[skillLevel]}%`,
        10: Constants.T.immune,
        20: showEquation ? Constants.T.damage.base[skillLevel] : Constants.T.damage,
        21: `${Constants.T.damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AdrianaBurnDamage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.T.defense_reduction},
        ]  
    })
}
