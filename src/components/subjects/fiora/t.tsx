import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1003100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.max_stack,
        2: Constants.T.movement_speed.duration,
        3: `${Constants.T.movement_speed.effect[skillLevel]}%`,
        4: `${Constants.T.q_cooldown_reduction}%`,
        5: `${Constants.T.cooldown_reduction}%`,
        6: `${Constants.T.damage.amp}%`,
        7: Constants.T.damage.base[skillLevel],
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true},
        ]  
    })
}
