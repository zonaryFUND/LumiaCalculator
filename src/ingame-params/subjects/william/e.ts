import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1032400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        1: RatioPercent(Constants.E.movement_speed)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.E.movement_speed, percent: true }
        ]
    })
}
