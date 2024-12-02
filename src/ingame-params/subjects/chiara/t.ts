import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1014100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.max_stack,
        1: Constants.T.duration,
        2: RatioPercent(Constants.T.healing_reduction),
        3: RatioPercent(Constants.T.movement_speed)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HpHealedDecreaseRatio", values: Constants.T.healing_reduction},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed}
        ]  
    })
}
