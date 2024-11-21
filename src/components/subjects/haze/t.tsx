import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1058100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.swap_time,
        1: Constants.T.damage,
        2: Constants.T.movement_speed.duration,
        3: `${Constants.T.movement_speed.effect[skillLevel]}%`,
        20: Constants.T.damage.base[skillLevel],
        22: `${Constants.T.damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true}
        ]  
    })
}
