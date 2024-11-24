import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1026100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: RatioPercent(Constants.T.making_time_reduction),
        1: Constants.T.cooldown.constant,
        2: showEquation ? RatioPercent(Constants.T.damage.amp) : Constants.T.damage,
        3: showEquation ? Constants.T.damage.base : RatioPercent(Constants.T.attack_speed),
        4: RatioPercent(Constants.T.attack_speed)
    }),
    expansion: ({ }) => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.T.damage.amp, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
