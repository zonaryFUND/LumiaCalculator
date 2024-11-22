import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1071500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation, config, status }) => {
        const base = {
            0: Constants.E.duration,
            1: `${Constants.E.attack_speed[skillLevel]}%`
        }
        if (showEquation) {
            return {
                0: Constants.R.first_damage.base[skillLevel],
                1: `${Constants.R.first_damage.attack}%`,
                2: Constants.R.stun,
                3: Constants.R.second_damage.base[skillLevel],
                4: `${Constants.R.second_damage.attack}%`,
                5: Constants.R.second_count,
                6: Constants.R.third_damage.base[skillLevel],
                7: `${Constants.R.third_damage.attack}%`,
                8: Constants.R.airborne
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.first_damage,
                1: Constants.R.stun,
                2: Constants.R.second_damage,
                3: Constants.R.second_count,
                4: Constants.R.third_damage,
                5: Constants.R.airborne
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/ThirdDamage", values: Constants.R.third_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
