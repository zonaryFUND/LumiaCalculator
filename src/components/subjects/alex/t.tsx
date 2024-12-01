import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 1027100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ skillLevel }) => ({
        0: Constants.T.hide_duration,
        1: Constants.T.movement_speed.area,
        2: Constants.T.movement_speed.duration,
        3: `${Constants.T.movement_speed.effect[skillLevel]}`,
        5: Constants.T.defense[skillLevel],
        6: 6,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true},
            {labelIntlID: "StatType/Defense", values: Constants.T.defense},
        ]  
    })
}
