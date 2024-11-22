import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1069300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation, config, status }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base[skillLevel],
                1: Constants.W.damage.level,
                2: `${Constants.W.damage.amp}%`,
                6: Constants.W.slow.duration,
                7: `${Constants.W.slow.center}%`,
                8: `${Constants.W.slow.outer}%`,
                9: Constants.W.ally_slow.duration,
                10: `${Constants.W.ally_slow.effect}%`,
                11: Constants.W.movement_speed.duration,
                12: `${Constants.W.movement_speed.effect.base[skillLevel]}%`,
                13: Constants.W.movement_speed.effect.level
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                2: Constants.W.slow.duration,
                3: `${Constants.W.slow.center}%`,
                4: `${Constants.W.slow.outer}%`,
                5: Constants.W.ally_slow.duration,
                6: `${Constants.W.ally_slow.effect}%`,
                7: Constants.W.movement_speed.duration,
                8: `${calculateValue(Constants.W.movement_speed.effect, status, config, skillLevel).static.floor().toString()}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.W.movement_speed.effect.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
