import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1030100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.heal.targetMaxHP),
        2: Constants.T.amount
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HealBurger", values: Constants.T.heal.targetMaxHP, percent: true}
        ]  
    })
}
