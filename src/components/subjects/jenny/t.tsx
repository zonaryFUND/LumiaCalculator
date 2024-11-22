import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1038100;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.hp.base,
        1: `${Constants.T.hp.maxHP[skillLevel]}%`,
        2: Constants.T.act_duration,
        3: Constants.T.hp,
        8: Constants.T.buff_duration,
        9: `${Constants.T.attack_speed[skillLevel]}%`,
        10: Constants.T.buff_duration,
        11: `${Constants.T.movement_speed}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MaxHpRegen", values: Constants.T.hp.maxHP, percent: true},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.T.attack_speed, percent: true},
        ]  
    })
}
