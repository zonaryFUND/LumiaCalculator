import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1014500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: 1,
        1: Constants.R.maxHP[skillLevel],
        2: showEquation ? Constants.R.damage.base[skillLevel] : Constants.R.damage,
        3: showEquation ? `${Constants.R.damage.amp}%` : Constants.R.heal,
        4: showEquation ? Constants.R.range : Constants.R.finish_damage,
        5: showEquation ? Constants.R.gauge_consumption : Constants.R.gauge_gain,
        6: showEquation ? Constants.R.finish_damage.base[skillLevel] : Constants.R.range,
        7: Constants.R.gauge_consumption,
        8: showEquation ? Constants.R.heal.base[skillLevel] : `${Constants.R.additional_damage_per_stack}%`,
        9: `${Constants.R.finish_damage.amp}%`,
        12: `${Constants.R.heal.amp}%`,
        13: Constants.R.gauge_gain,
        14: `${Constants.R.additional_damage_per_stack}%`
    }),
    expansion: () => ({
        tipValues: {
            0: `${Constants.R.animal_heal}%`,
            1: `${Constants.R.animal_gauge}%`,
            2: Constants.R.gauge_consumption_acceleration.after,
            3: `${Constants.R.gauge_consumption_acceleration.effect}%`
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
