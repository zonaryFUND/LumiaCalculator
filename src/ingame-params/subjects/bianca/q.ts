import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1042200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "hp-ratio",
        value: Constants.Q.hp_cost_percent
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.Q.first_damage.base : Constants.Q.first_damage,
        1: Constants.Q.second_damage,
        2: Constants.Q.second_damage.base,
        4: RatioPercent(Constants.Q.second_damage.targetMaxHP),
        5: Constants.Q.bind,
        6: RatioPercent(Constants.Q.first_damage.amp),
        7: RatioPercent(Constants.Q.second_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
