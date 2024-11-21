import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1049300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: {constant: Constants.T.shared_cooldown},
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base[skillLevel],
                1: `${Constants.W.damage.attack}%`,
                2: Constants.W.enhanced_damage.base[skillLevel],
                3: `${Constants.W.enhanced_damage.attack}%`,
                4: Constants.W.enhanced_damage.level,
                5: Constants.W.bind,
                6: Constants.W.stack_bind_extend
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.enhanced_damage,
                2: Constants.W.bind,
                3: Constants.W.stack_bind_extend
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/FinalSequenceDamage", values: Constants.W.enhanced_damage.base}
        ]  
    })
}
