import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1007100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.stack_threshold[skillLevel],
        1: `${Constants.T.heal.maxHP[skillLevel]}%`,
        2: 1,
        3: Constants.T.damage.base[skillLevel],
        4: `${Constants.T.damage.attack}%`,
        5: Constants.T.w_cooldown_reduction,
        6: `${Constants.T.damage.amp}%`,
        20: Constants.T.damage,
        21: Constants.T.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.maxHP, percent: true},
            {labelIntlID: "ToolTipType/ActiveCount", values: Constants.T.stack_threshold},
        ]  
    })
}
