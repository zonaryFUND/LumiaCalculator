import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1027100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.hide_duration,
        1: Constants.T.movement_speed.area,
        2: Constants.T.movement_speed.duration,
        3: RatioPercent(Constants.T.movement_speed.effect),
        5: Constants.T.defense,
        6: 6,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true},
            {labelIntlID: "StatType/Defense", values: Constants.T.defense},
        ]  
    })
}
