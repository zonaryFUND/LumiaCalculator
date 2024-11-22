import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1009200;

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
                0: Constants.Q.duration,
                1: Constants.Q.damage.base[skillLevel],
                2: `${Constants.Q.damage.attack}%`,
                3: `${Constants.Q.damage.amp}%`,
                4: Constants.Q.bind,
                5: Constants.Q.duration_enemy,
                6: Constants.Q.duration_reduction,
                7: Constants.Q.additional_damage.base[skillLevel],
                8: `${Constants.Q.additional_damage.attack}%`,
                9: `${Constants.Q.additional_damage.amp}%`,
                10: Constants.Q.additional_bind,
                11: Constants.Q.bind_max
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.duration,
                1: Constants.Q.damage,
                2: Constants.Q.bind,
                3: Constants.Q.duration_enemy,
                4: Constants.Q.duration_reduction,
                5: Constants.Q.additional_damage,
                6: Constants.Q.additional_bind,
                7: Constants.Q.bind_max
            } as Record<number, number | string | ValueRatio>
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.additional_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
