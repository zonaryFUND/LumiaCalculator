import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1086400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base: TooltipValues = {
            1: Constants.E.movement_speed.duration,
            2: RatioPercent(Constants.E.additional_movement_speed),
            3: RatioPercent(Constants.E.movement_speed.effect)
        }

        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.E.damage.additionalAttack),
                20: Constants.E.damage.base
            }
        } else {
            return {
                ...base,
                20: Constants.E.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.E.movement_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/HitMoveSpeedUp", values: Constants.E.additional_movement_speed, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
           {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
