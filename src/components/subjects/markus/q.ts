import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1053200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.Q.count,
            1: RatioPercent(Constants.Q.attack_speed),
            2: RatioPercent(Constants.Q.movement_speed.effect),
            4: Constants.Q.duration,
            5: Constants.Q.movement_speed.duration
        }
        if (showEquation) {
            return {
                ...base,
                6: Constants.Q.damage.base,
                7: RatioPercent(Constants.Q.damage.additionalMaxHP),
                8: RatioPercent(Constants.Q.heal)
            }
        } else {
            return {
                ...base,
                6: Constants.Q.damage,
                7: RatioPercent(Constants.Q.heal)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.Q.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.Q.movement_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
