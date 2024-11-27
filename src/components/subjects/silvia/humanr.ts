import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1016500;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.HumanR.cooldown,
    values: ({ }) => ({
        0: Constants.HumanR.movement_speed,
        1: Constants.HumanR.threshold,
        2: Constants.HumanR.fuel_consumption,
        3: 1,
        4: Constants.HumanR.defense,
        5: Constants.HumanR.ms_penalty.duration,
        6: RatioPercent(Constants.HumanR.ms_penalty.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DefaultMoveSpeed", values: Constants.HumanR.movement_speed},
            {labelIntlID: "StatType/DefenseRatio", values: Constants.HumanR.defense},
            {labelIntlID: "ToolTipType/PreheatingMoveSpeed", values: Constants.HumanR.ms_penalty.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.HumanR.cooldown},
        ]  
    })
}
