import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1022200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.first_damage.base[skillLevel],
                1: `${Constants.Q.first_damage.attack}%`,
                3: Constants.Q.reuse,
                4: Constants.Q.second_damage.base[skillLevel],
                5: `${Constants.Q.second_damage.attack}%`,
                7: `${Constants.Q.enhance_max}%`,
                8: `${Constants.Q.enhance_max_target_hp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.first_damage,
                1: Constants.Q.reuse,
                2: Constants.Q.second_damage,
                3: `${Constants.Q.enhance_max}%`,
                4: `${Constants.Q.enhance_max_target_hp}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BulletDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/DashDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
