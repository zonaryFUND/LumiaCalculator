import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1006400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        1: Constants.E.duration,
        2: Constants.E.wire_length,
        3: RatioPercent(Constants.E.attack_speed),
        4: Constants.E.remain
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AttackSpeedRatioValue", values: Constants.E.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}