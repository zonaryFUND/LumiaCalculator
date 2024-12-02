import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1010500;

export const info: TooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.min_damage.base,
        1: RatioPercent(Constants.R.min_damage.attack),
        2: Constants.R.max_damage.base,
        3: RatioPercent(Constants.R.max_damage.attack),
        7: Constants.R.supression,
        20: Constants.R.min_damage,
        21: Constants.R.max_damage,
        22: RatioPercent(Constants.R.min_damage.gauge),
        23: RatioPercent(Constants.R.max_damage.gauge)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.R.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.R.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
