import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1041400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.E.movement_speed.duration,
                1: RatioPercent(Constants.E.movement_speed.effect.base),
                2: RatioPercent(Constants.E.movement_speed.effect.amp),
                3: Constants.E.damage.base,
                4: RatioPercent(Constants.E.damage.amp),
                5: Constants.E.shield_duration,
                6: Constants.E.shield.base,
                7: RatioPercent(Constants.E.shield.amp),
                8: Constants.E.enhanced_damage.base,
                9: RatioPercent(Constants.E.enhanced_damage.amp),
                10: RatioPercent(Constants.E.chase_movement_speed.base),
                11: RatioPercent(Constants.E.chase_movement_speed.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.movement_speed.duration,
                1: RatioPercent(Constants.E.movement_speed.effect),
                2: Constants.E.damage,
                3: Constants.E.shield_duration,
                4: Constants.E.shield,
                5: Constants.E.enhanced_damage,
                6: RatioPercent(Constants.E.chase_movement_speed)
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
