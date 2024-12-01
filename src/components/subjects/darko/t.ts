import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1074100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: Constants.T.defense.duration,
        1: RatioPercent(Constants.T.defense.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.T.defense.effect, percent: true}
        ]  
    })
}
