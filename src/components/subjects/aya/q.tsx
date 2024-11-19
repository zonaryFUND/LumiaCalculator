import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1002200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? `${Constants.Q.second_damage.attack}%` : Constants.Q.second_damage,
        1: showEquation ? Constants.Q.second_damage.base[skillLevel] : Constants.Q.first_damage,
        2: showEquation ? `${Constants.Q.second_damage.amp}%` : Constants.Q.attack_speed.duration,
        3: showEquation ? `${Constants.Q.first_damage.attack}%` : `${Constants.Q.attack_speed.effect[skillLevel]}%`,
        4: Constants.Q.attack_speed.duration,
        5: `${Constants.Q.attack_speed.effect[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.Q.attack_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
