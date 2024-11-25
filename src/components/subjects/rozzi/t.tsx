import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1021100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ showEquation }) => {
        const base = {
            2: Constants.T.duration,
            3: RatioPercent(Constants.T.food),
            4: RatioPercent(Constants.T.drink)
        }
        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.T.first_damage.attack),
                1: RatioPercent(Constants.T.second_damage.attack)
            }
        } else {
            return {
                ...base,
                0: Constants.T.first_damage,
                1: Constants.T.second_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SecondDamageApcoef", values: Constants.T.second_damage.attack, percent: true}
        ]  
    })
}
