import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1026100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation, skillLevel }) => ({
        0: `${Constants.T.making_time_reduction}%`,
        1: Constants.T.cooldown.constant[skillLevel],
        2: showEquation ? `${Constants.T.damage.amp[skillLevel]}%` : Constants.T.damage,
        3: showEquation ? Constants.T.damage.base[skillLevel] : `${Constants.T.attack_speed}%`,
        4: `${Constants.T.attack_speed}%`
    }),
    expansion: ({skillLevel}) => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.T.damage.amp, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
