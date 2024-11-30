import Constants from "./constants.json";
import { TooltipInfo } from "../subjects/dictionary";
import { RatioPercent } from "../subjects/valueratio-to-string";

export const code = 1021500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.duration,
        1: RatioPercent(Constants.R.slow),
        2: Constants.R.damage.base,
        3: RatioPercent(Constants.R.damage.attack),
        4: Constants.R.basic_attack_launch,
        5: RatioPercent(Constants.R.additional_damage),
        6: RatioPercent(Constants.R.cooldown_reduction),
        7: Constants.R.movement_speed.duration,
        8: RatioPercent(Constants.R.movement_speed.effect),
        9: Constants.R.skill_hit,
        10: Constants.R.detonate_slow.duration,
        11: RatioPercent(Constants.R.detonate_slow.effect),
        20: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/MaxhpDamage", values: Constants.R.additional_damage, percent: true}
        ]  
    })
}
