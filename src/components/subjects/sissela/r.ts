import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1015500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.damage.base,
        2: Constants.R.lost_hp_conversion,
        3: Constants.R.passive_enhance_duration,
        4: Constants.R.passive_enhance,
        5: Constants.R.range,
        8: Constants.R.min_hp,
        9: RatioPercent(Constants.R.damage.amp),
        10: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/LostHpDamage", values: Constants.R.lost_hp_conversion},
            {labelIntlID: "ToolTipType/PassiveDuration", values: Constants.R.passive_enhance_duration},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
