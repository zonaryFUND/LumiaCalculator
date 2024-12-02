import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1051500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.first_damage.base,
        2: Constants.R.echo_damage.base,
        4: Constants.R.unstoppable,
        5: RatioPercent(Constants.R.heal.targetMaxHP),
        6: Constants.R.dance,
        7: RatioPercent(Constants.R.damage_reduction),
        8: RatioPercent(Constants.R.first_damage.amp),
        9: RatioPercent(Constants.R.echo_damage.amp),
        20: Constants.R.first_damage,
        21: Constants.R.echo_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/EchoDamage", values: Constants.R.echo_damage.base},
            {labelIntlID: "ToolTipType/HpRegenRatio", values: Constants.R.heal.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
