import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1007100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.stack_threshold,
        1: RatioPercent(Constants.T.heal.maxHP),
        2: 1,
        3: Constants.T.damage.base,
        4: RatioPercent(Constants.T.damage.attack),
        5: Constants.T.w_cooldown_reduction,
        6: RatioPercent(Constants.T.damage.amp),
        20: Constants.T.damage,
        21: Constants.T.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.maxHP, percent: true},
            {labelIntlID: "ToolTipType/ActiveCount", values: Constants.T.stack_threshold},
        ]  
    })
}
