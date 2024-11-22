import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1029100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.T.movement_speed[skillLevel]}%`,
        1: `${Constants.T.attack_speed[skillLevel]}%`,
        2: Constants.T.damage.base[skillLevel],
        5: `${Constants.T.damage.amp}%`,
        6: Constants.T.cooldown.constant[skillLevel],
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/AddAttackSpeedRatio", values: Constants.T.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
