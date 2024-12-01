import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1047100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.damage.base,
        1: RatioPercent(Constants.T.damage.amp),
        2: RatioPercent(Constants.T.attack_speed),
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base}
        ]  
    })
}
