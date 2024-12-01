import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1061100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.vision,
        1: Constants.T.stay,
        2: RatioPercent(Constants.T.attack_speed),
        3: Constants.T.defense,
        4: RatioPercent(Constants.T.fish_food)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SightRange", values: Constants.T.vision}
        ]  
    })
}
