import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1023500;

const maxDamage = {
    base: Constants.R.min_damage.base.map(v => v * Constants.R.max_damage_ratio),
    amp: Constants.R.min_damage.amp * Constants.R.max_damage_ratio
}

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: RatioPercent(Constants.R.heal.targetMaxHP),
        1: showEquation ? Constants.R.min_damage.base : Constants.R.min_damage,
        2: maxDamage,
        3: maxDamage.base,
        10: Constants.R.heal_duration,
        11: Constants.R.heal_duration,
        12: RatioPercent(Constants.R.min_damage.amp),
        13: RatioPercent(maxDamage.amp),
        14: showEquation ? RatioPercent(Constants.R.heal.amp) : Constants.R.heal,

    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.R.max_damage_target_hp)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.R.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: maxDamage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
