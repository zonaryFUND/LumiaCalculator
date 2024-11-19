import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1023100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.wound_duration,
        1: Constants.T.wound,
        5: Constants.T.max_stack,
        6: Constants.T.wound_duration,
        7: `${Constants.T.critical_wound.targetMaxHP}%`,
        8: Constants.T.critical_wound,
        9: Constants.T.shield_duration,
        10: showEquation ? Constants.T.shield.base[skillLevel] : Constants.T.shield,
        12: `${Constants.T.movement_speed[skillLevel]}%`,
        13: `${Constants.T.wound.amp}%`,
        14: `${Constants.T.critical_wound.amp}%`,
        15: `${Constants.T.shield.amp}%`,
        16: `${Constants.T.healing_reduction}%`
    }),
    expansion: () => ({
        tipValues: {
            0: `${Constants.R.max_damage_target_hp}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true}
        ]  
    })
}
