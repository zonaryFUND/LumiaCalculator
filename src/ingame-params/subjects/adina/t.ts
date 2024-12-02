import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1052100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.duration,
        1: Constants.T.movement_speed.base,
        2: RatioPercent(Constants.T.movement_speed.amp),
        20: Constants.T.movement_speed
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.base}
        ]  
    })
}
