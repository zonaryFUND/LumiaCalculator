import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1047500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.max_additional_shield,
        1: Constants.R.first_damage.base,
        2: RatioPercent(Constants.R.first_damage.amp),
        3: Constants.R.shield.base,
        4: RatioPercent(Constants.R.shield.amp),
        5: Constants.R.second_damage.base,
        6: RatioPercent(Constants.R.second_damage.amp),
        7: Constants.R.additional_shield.base,
        8: RatioPercent(Constants.R.additional_shield.amp),
        11: Constants.R.shield_duration,
        20: Constants.R.first_damage,
        21: Constants.R.shield,
        22: Constants.R.second_damage,
        23: Constants.R.additional_shield,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.R.shield.base},
            {labelIntlID: "ToolTipType/AdditionalShield", values: Constants.R.additional_shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
