import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1010300;

export const info: TooltipInfo = {
    skill: "W",
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.cast,
        1: `${Constants.W.basic_attack_amp}%`,
        2: `${Constants.W.basic_attack_amp * 100}%`,
        3: Constants.W.cooldown_reduction,
        20: `${Constants.W.damage_reduction[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/DecreaseReceiveDamageRatio", values: Constants.W.damage_reduction, percent: true}
        ]  
    })
}
