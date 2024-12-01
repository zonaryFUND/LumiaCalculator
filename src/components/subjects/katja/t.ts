import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1072100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.duration,
        2: Constants.T.credit,
        3: Constants.T.damage.base,
        4: RatioPercent(Constants.T.damage.attack),
        20: Constants.T.damage
    }),
    expansion: () => ({
        tipValues: {
            0: 3,
            2: RatioPercent(Constants.R.cooldown_return)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.T.damage.attack, percent: true},
        ]  
    })
}
