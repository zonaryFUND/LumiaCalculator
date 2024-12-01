import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1003100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.max_stack,
        2: Constants.T.movement_speed.duration,
        3: RatioPercent(Constants.T.movement_speed.effect),
        4: RatioPercent(Constants.T.q_cooldown_reduction),
        5: RatioPercent(Constants.T.cooldown_reduction),
        6: RatioPercent(Constants.T.damage.amp),
        7: Constants.T.damage.base,
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true},
        ]  
    })
}
