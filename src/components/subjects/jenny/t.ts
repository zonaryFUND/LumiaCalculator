import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1038100;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: Constants.T.hp.base,
        1: RatioPercent(Constants.T.hp.maxHP),
        2: Constants.T.act_duration,
        3: Constants.T.hp,
        8: Constants.T.buff_duration,
        9: RatioPercent(Constants.T.attack_speed),
        10: Constants.T.buff_duration,
        11: RatioPercent(Constants.T.movement_speed)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MaxHpRegen", values: Constants.T.hp.maxHP, percent: true},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.T.attack_speed, percent: true},
        ]  
    })
}
