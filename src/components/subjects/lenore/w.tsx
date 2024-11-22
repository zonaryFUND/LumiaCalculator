import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1075300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.shield.duration,
                1: Constants.W.shield.effect.base[skillLevel],
                2: `${Constants.W.shield.effect.amp}%`,
                3: Constants.W.damage.base[skillLevel],
                4: `${Constants.W.damage.amp}%`,
                5: Constants.W.bind,
                6: `${Constants.W.enhance.shield}%`,
                7: Constants.W.enhance.movement_speed.duration,
                8: `${Constants.W.enhance.movement_speed.effect}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.shield.duration,
                1: Constants.W.shield.effect,
                2: Constants.W.damage,
                3: Constants.W.bind,
                4: `${Constants.W.enhance.shield}%`,
                5: Constants.W.enhance.movement_speed.duration,
                6: `${Constants.W.enhance.movement_speed.effect}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.effect.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
