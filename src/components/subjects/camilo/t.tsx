import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1039100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.T.attack_speed[skillLevel]}%`,
        2: Constants.T.duration,
        3: showEquation ? Constants.T.shield.base[skillLevel] : Constants.T.shield,
        4: showEquation ? `${Constants.T.shield.attack}%` : Constants.T.wt_cooldown_reduction,
        5: Constants.T.wt_cooldown_reduction,
        6: Constants.T.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.T.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
