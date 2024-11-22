import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1072100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.duration,
        2: Constants.T.credit,
        3: Constants.T.damage.base[skillLevel],
        4: `${Constants.T.damage.attack[skillLevel]}%`,
        20: Constants.T.damage
    }),
    expansion: () => ({
        tipValues: {
            0: 3,
            2: `${Constants.R.cooldown_return}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.T.damage.attack, percent: true},
        ]  
    })
}
