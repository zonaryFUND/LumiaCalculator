import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1017100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
        8: Constants.T.duration,
        9: RatioPercent(Constants.T.defense_reduction),
        10: Constants.T.immune,
        20: showEquation ? Constants.T.damage.base : Constants.T.damage,
        21: RatioPercent(Constants.T.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AdrianaBurnDamage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.T.defense_reduction},
        ]  
    })
}
