import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1037200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        1: RatioPercent(Constants.Q.damage.attack),
        2: Constants.Q.center_damage.base,
        3: RatioPercent(Constants.Q.center_damage.attack),
        5: Constants.Q.slow.duration,
        6: RatioPercent(Constants.Q.slow.effect),
        7: RatioPercent(Constants.Q.basic_attack_enhance.attack_speed),
        20: Constants.Q.damage,
        21: Constants.Q.center_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "StatType/AttackSpeed", values: Constants.Q.basic_attack_enhance.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.Q.center_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
        ]  
    })
}
