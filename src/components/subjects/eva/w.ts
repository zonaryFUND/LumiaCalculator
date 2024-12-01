import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1036300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.first_damage.base,
        2: Constants.W.second_damage.base,
        4: Constants.W.duration,
        6: Constants.W.airborne,
        8: RatioPercent(Constants.W.slow),
        9: Constants.W.vitalforce,
        10: RatioPercent(Constants.W.first_damage.amp),
        11: RatioPercent(Constants.W.second_damage.amp),
        20: Constants.W.first_damage,
        21: Constants.W.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.first_damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.W.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
