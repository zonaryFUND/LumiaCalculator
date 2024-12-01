import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1036500;

export const info: TooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.tick,
        1: Constants.R.damage.base,
        2: Constants.R.max_stack,
        3: Constants.R.stack_damage.base,
        5: Constants.R.min_vf,
        6: Constants.R.tick,
        7: Constants.R.vf_consumption,
        8: RatioPercent(Constants.R.damage.amp),
        9: RatioPercent(Constants.R.stack_damage.amp),
        20: Constants.R.damage,
        21: Constants.R.stack_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.R.stack_damage.base}
        ]  
    })
}
