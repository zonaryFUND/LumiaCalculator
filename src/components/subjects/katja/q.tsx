import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1072200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        3: Constants.Q.min_damage.base[skillLevel],
        4: `${Constants.Q.min_damage.attack}%`,
        5: Constants.Q.max_damage.base[skillLevel],
        6: `${Constants.Q.max_damage.attack}%`,
        7: Constants.Q.attack_speed.duration,
        8: `${Constants.Q.attack_speed.effect[skillLevel]}%`,
        20: Constants.Q.min_damage,
        21: Constants.Q.max_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.Q.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.Q.max_damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.Q.attack_speed.effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
