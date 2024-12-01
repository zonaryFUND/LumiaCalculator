import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1058100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.swap_time,
        1: Constants.T.damage,
        2: Constants.T.movement_speed.duration,
        3: RatioPercent(Constants.T.movement_speed.effect),
        20: Constants.T.damage.base,
        22: RatioPercent(Constants.T.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true}
        ]  
    })
}
