import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1013400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "hp",
        value: Constants.E.hp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.airborne,
        1: Constants.E.reuse,
        2: Constants.E.slow.duration,
        3: RatioPercent(Constants.E.slow.effect),
        4: Constants.E.first_damage.base,
        6: RatioPercent(Constants.E.first_damage.amp),
        7: RatioPercent(Constants.E.first_damage.maxHP),
        10: Constants.E.second_damage.base,
        12: RatioPercent(Constants.E.second_damage.amp),
        14: RatioPercent(Constants.E.second_damage.maxHP),
        20: Constants.E.first_damage,
        21: Constants.E.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Xiukai_Active3_1_Damage", values: Constants.E.first_damage.base},
            {labelIntlID: "ToolTipType/Xiukai_Active3_2_Damage", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/Xiukai_Active3_2_Slow", values: Constants.E.slow.effect, percent: true}
        ]  
    })
}
