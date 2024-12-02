import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1014500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: 1,
        1: Constants.R.maxHP,
        2: showEquation ? Constants.R.damage.base : Constants.R.damage,
        3: showEquation ? RatioPercent(Constants.R.damage.amp) : Constants.R.heal,
        4: showEquation ? Constants.R.range : Constants.R.finish_damage,
        5: showEquation ? Constants.R.gauge_consumption : Constants.R.gauge_gain,
        6: showEquation ? Constants.R.finish_damage.base : Constants.R.range,
        7: Constants.R.gauge_consumption,
        8: showEquation ? Constants.R.heal.base : RatioPercent(Constants.R.additional_damage_per_stack),
        9: RatioPercent(Constants.R.finish_damage.amp),
        12: RatioPercent(Constants.R.heal.amp),
        13: Constants.R.gauge_gain,
        14: RatioPercent(Constants.R.additional_damage_per_stack)
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.R.animal_heal),
            1: RatioPercent(Constants.R.animal_gauge),
            2: Constants.R.gauge_consumption_acceleration.after,
            3: RatioPercent(Constants.R.gauge_consumption_acceleration.effect)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DotDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/JudgmentDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/MaxHpUp", values: Constants.R.maxHP},
            {labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
