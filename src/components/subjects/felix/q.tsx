import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1049200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: {constant: Constants.T.shared_cooldown},
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base[skillLevel],
                1: `${Constants.Q.damage.attack}%`,
                2: Constants.Q.enhanced_damage.base[skillLevel],
                3: `${Constants.Q.enhanced_damage.attack}%`,
                4: Constants.Q.enhanced_damage.level,
                5: Constants.Q.airborne,
                6: Constants.Q.stack_damage_conversion,
                7: Constants.Q.stack_airborne_extend
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.damage,
                1: Constants.Q.enhanced_damage,
                2: Constants.Q.airborne,
                3: Constants.Q.stack_damage_conversion,
                4: Constants.Q.stack_airborne_extend
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/FinalSequenceDamage", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/LinkedAttackDamage", values: Constants.Q.stack_damage_conversion.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
