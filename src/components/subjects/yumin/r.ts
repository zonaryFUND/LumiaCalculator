import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1077500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.R.slow.duration,
        1: RatioPercent(Constants.R.slow.effect),
        2: Constants.R.airborne,
        3: Constants.R.damage.base,
        4: RatioPercent(Constants.R.damage.amp),
        5: Constants.R.second_damage.base,
        6: RatioPercent(Constants.R.second_damage.amp),
        7: RatioPercent(Constants.R.second_damage.targetMaxHP),
        20: Constants.R.damage,
        21: showEquation ? "" : Constants.R.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
