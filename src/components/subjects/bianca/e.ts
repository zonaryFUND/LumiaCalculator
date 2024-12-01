import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1042400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "hp-ratio",
        value: Constants.E.hp_cost_percent
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.E.max_charge,
        1: Constants.E.charge_remain,
        4: showEquation ? Constants.E.min_damage.base : Constants.E.min_damage,
        5: Constants.E.max_damage,
        6: Constants.E.max_damage.base,
        8: showEquation ? Constants.E.heal.base : Constants.E.heal,
        10: Constants.E.additional_cost.per,
        11: RatioPercent(Constants.E.additional_cost.value),
        12: RatioPercent(Constants.E.multiple_hit_heal_amp),
        13: RatioPercent(Constants.E.min_damage.amp),
        14: RatioPercent(Constants.E.max_damage.amp),
        15: RatioPercent(Constants.E.heal.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.E.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.E.max_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.E.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
