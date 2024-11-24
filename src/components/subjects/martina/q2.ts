import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1057210;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q2.sp_cost
    },
    cooldown: Constants.Q2.cooldown,
    values: ({ }) => ({
        0: Constants.Q2.damage.base,
        1: RatioPercent(Constants.Q2.damage.attack),
        2: Constants.Q2.cooldown_reduction,
        3: Constants.Q2.movement_speed.duration,
        4: RatioPercent(Constants.Q2.movement_speed.effect),
        5: Constants.Q2.attack_speed.duration,
        6: RatioPercent(Constants.Q2.attack_speed.effect),
        8: Constants.Q2.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q2.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.Q2.movement_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpTime", values: Constants.Q2.movement_speed.duration},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.Q2.attack_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q2.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q2.sp_cost}
        ]  
    })
}
