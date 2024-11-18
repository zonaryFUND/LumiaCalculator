import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1024200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.Q.pawn_damage.base[skillLevel],
        2: 3,
        3: Constants.Q.queen_damage.base[skillLevel],
        5: Constants.Q.stun,
        6: Constants.Q.stack_reset,
        7: Constants.Q.duration,
        8: `${Constants.Q.movement_speed[skillLevel]}%`,
        9: `${Constants.Q.pawn_damage.amp}%`,
        10: `${Constants.Q.queen_damage.amp}%`,
        20: Constants.Q.pawn_damage,
        21: Constants.Q.queen_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/PawnDamage", values: Constants.Q.pawn_damage.base},
            {labelIntlID: "ToolTipType/QueenDamage", values: Constants.Q.queen_damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.Q.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown.constant},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
