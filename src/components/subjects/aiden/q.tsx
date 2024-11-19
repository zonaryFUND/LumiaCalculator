import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1046200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.Q.damage.base[skillLevel],
        1: `${Constants.Q.damage.attack}%`,
        2: 1,
        3: Constants.Q.cooldown_reduction,
        4: Constants.Q.range_damage.base[skillLevel],
        5: `${Constants.Q.range_damage.attack}%`,
        6: Constants.Q.slow.duration,
        7: `${Constants.Q.slow.effect[skillLevel]}`,
        9: Constants.Q.range_cooldown_reduction,
        20: Constants.Q.damage,
        21: Constants.Q.range_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SwordDamage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/VoltGunDamage", values: Constants.Q.range_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown.constant},
            {labelIntlID: "ToolTipType/SwordCost", values: Constants.Q.range_sp_cost}
        ]  
    })
}
