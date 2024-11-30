import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1032200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.Q.duration,
        1: RatioPercent(Constants.Q.attack_speed),
        2: showEquation ? RatioPercent(Constants.Q.damage.attack) : Constants.Q.damage,
        3: Constants.Q.extend_duration        
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.Q.damage.attack.map(v => v - 100), percent: true},
            {labelIntlID: "ToolTipType/AddAttackSpeedRatio", values: Constants.Q.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
