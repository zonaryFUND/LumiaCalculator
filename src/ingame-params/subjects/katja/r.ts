import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1072500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.first_damage.base,
        1: RatioPercent(Constants.R.first_damage.attack),
        2: 3,
        4: Constants.R.second_damage.base,
        5: RatioPercent(Constants.R.second_damage.attack),
        6: Constants.R.third_damage.base,
        7: RatioPercent(Constants.R.third_damage.attack),
        20: Constants.R.first_damage,
        21: Constants.R.second_damage,
        22: Constants.R.third_damage,
    }),
    expansion: () => ({
        tipValues: {
            0: 3,
            2: RatioPercent(Constants.R.cooldown_return)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/ThirdDamage", values: Constants.R.third_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
