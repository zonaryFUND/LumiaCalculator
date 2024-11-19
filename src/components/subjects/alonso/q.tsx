import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1068200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.damage,
        1: `${Constants.Q.movement_speed}%`,
        2: `${Constants.Q.near_movement_speed[skillLevel]}%`,
        3: Constants.Q.stun,
        10: Constants.Q.damage.base[skillLevel],
        11: `${Constants.Q.damage.amp}%`,
        12: showEquation ? Constants.Q.basic_attack_damage.level : Constants.Q.basic_attack_damage,
        13: `${Constants.Q.basic_attack_damage.targetMaxHP[skillLevel]}%`,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AlonsoActive1MoveSpeed", values: Constants.Q.near_movement_speed},
            {labelIntlID: "ToolTipType/AlonsoActive1TargetAttack", values: Constants.Q.basic_attack_damage.targetMaxHP},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
