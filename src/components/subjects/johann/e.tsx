import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { calculateValue } from "app-types/value-ratio/calculation";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1041400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation, status, config }) => {
        if (showEquation) {
            return {
                0: Constants.E.movement_speed.duration,
                1: `${Constants.E.movement_speed.effect.base[skillLevel]}%`,
                2: `${Constants.E.movement_speed.effect.amp}%`,
                3: Constants.E.damage.base[skillLevel],
                4: `${Constants.E.damage.amp}%`,
                5: Constants.E.shield_duration,
                6: Constants.E.shield.base[skillLevel],
                7: `${Constants.E.shield.amp}%`,
                8: Constants.E.enhanced_damage.base[skillLevel],
                9: `${Constants.E.enhanced_damage.amp}%`,
                10: `${Constants.E.chase_movement_speed.base[skillLevel]}%`,
                11: `${Constants.E.chase_movement_speed.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.movement_speed.duration,
                1: `${calculateValue(Constants.E.movement_speed.effect, status, config, skillLevel).static.floor().toString()}%`,
                2: Constants.E.damage,
                3: Constants.E.shield_duration,
                4: Constants.E.shield,
                5: Constants.E.enhanced_damage,
                6: `${calculateValue(Constants.E.chase_movement_speed, status, config, skillLevel).static.floor().toString()}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.E.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.E.shield.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.E.movement_speed.effect.base, percent: true},
            {labelIntlID: "ToolTipType/ChaseMoveSpeed", values: Constants.E.chase_movement_speed.base, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
