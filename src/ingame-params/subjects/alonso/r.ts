import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1068500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.damage,
        1: Constants.R.duration,
        2: Constants.R.heal,
        3: Constants.R.damage_on_time,
        4: RatioPercent(Constants.R.slow),
        5: Constants.R.final_damage.min,
        6: Constants.R.final_damage.max,
        10: Constants.R.damage.base,
        11: RatioPercent(Constants.R.damage.amp),
        12: Constants.R.heal.base,
        13: RatioPercent(Constants.R.heal.maxHP),
        14: Constants.R.damage_on_time.base,
        15: RatioPercent(Constants.R.damage_on_time.amp),
        16: Constants.R.final_damage.min.base,
        17: RatioPercent(Constants.R.final_damage.min.amp),
        18: RatioPercent(Constants.R.final_damage.min.additionalMaxHP),
        19: Constants.R.final_damage.max.base,
        20: RatioPercent(Constants.R.final_damage.max.amp),
        21: RatioPercent(Constants.R.final_damage.max.additionalMaxHP),
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.damage.base},
            {labelIntlID: "StatType/MaxHpHealRatio", values: Constants.R.heal.maxHP, percent: true},
            {labelIntlID: "ToolTipType/DotDamage", values: Constants.R.damage_on_time.base},
            {labelIntlID: "ToolTipType/AlonsoActive4FinishDamage_Min", values: Constants.R.final_damage.min.base},
            {labelIntlID: "ToolTipType/AlonsoActive4FinishDamage_Max", values: Constants.R.final_damage.max.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
