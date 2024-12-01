import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { calculateValue } from "app-types/value-ratio/calculation";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1010100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
        0: Constants.T.threshold,
        1: 100,
        2: Constants.T.drunk_duration,
        3: showEquation ? RatioPercent(Constants.T.damage.attack) : Constants.T.damage,
        6: RatioPercent(Constants.T.attack_speed)
    }),
    expansion: ({ config, status }) => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: [0,1,2].map(level => calculateValue(
                Constants.T.damage, 
                status,
                config,
                level
            ).static.floor().toString())},
        ]  
    })
}
