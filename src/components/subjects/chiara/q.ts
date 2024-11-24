import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1014200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        1: showEquation ? Constants.Q.damage.base : Constants.Q.damage,
        2: Constants.Q.additional_damage,
        3: Constants.Q.heal_duration,
        4: showEquation ? Constants.Q.heal.base : Constants.Q.heal,
        5: Constants.Q.additional_damage.base,
        6: RatioPercent(Constants.Q.damage.amp),
        8: RatioPercent(Constants.Q.additional_damage.amp),
        10: RatioPercent(Constants.Q.heal.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.additional_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.Q.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
        ]  
    })
}
