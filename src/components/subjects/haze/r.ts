import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1058500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.duration,
        1: Constants.R.ammo,
        3: Constants.R.slow.duration,
        4: RatioPercent(Constants.R.slow.effect),
        5: Constants.R.area_damage,
        6: RatioPercent(Constants.R.max_cooldown_reduction),
        7: Constants.R.switch_damage,
        8: Constants.R.movement_speed_penalty,
        20: Constants.R.area_damage.base,
        22: RatioPercent(Constants.R.area_damage.amp),
        23: Constants.R.switch_damage.base,
        25: RatioPercent(Constants.R.switch_damage.amp)
    }),
    expansion: () => ({
        tipValues: {
            0: Constants.R.basic_attack_range,
            1: Constants.R.attack_speed,
            2: Constants.R.movement_speed_penalty,
            3: Constants.R.vision
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Haze_SwingDamage", values: Constants.R.switch_damage.base},
            {labelIntlID: "ToolTipType/Haze_RocketDamage", values: Constants.R.area_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
