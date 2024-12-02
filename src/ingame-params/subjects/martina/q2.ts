import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057210;

export const info: TooltipProps = {
    skillKey: "Q",
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
