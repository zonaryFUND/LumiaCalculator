import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1032100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.T.cooldown.constant,
        1: showEquation ? RatioPercent(Constants.T.damage.attack) : Constants.T.damage,
        2: RatioPercent(Constants.T.movement_speed),
        3: Constants.T.duration,
        4: Constants.common.ball_duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.T.damage.attack.map(v => v - 100), percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true}
        ]  
    })
}
