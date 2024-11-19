import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1068100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.immune,
        1: Constants.T.cooldown.constant[skillLevel],
        2: Constants.T.heal,
        10: Constants.T.heal.base[skillLevel],
        11: `${Constants.T.heal.maxHP[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.base},
            {labelIntlID: "StatType/MaxHpCoef", values: Constants.T.heal.maxHP},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
