import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1015200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "hp",
        value: Constants.Q.hp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        1: Constants.Q.first_damage.base,
        3: Constants.Q.second_damage.base,
        5: RatioPercent(Constants.Q.first_damage.amp),
        6: RatioPercent(Constants.Q.second_damage.amp),
        7: Constants.Q.first_damage,
        8: Constants.Q.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveDamage2", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/ArriveDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
