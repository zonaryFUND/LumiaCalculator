import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1075300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.shield.duration,
                1: Constants.W.shield.effect.base,
                2: RatioPercent(Constants.W.shield.effect.amp),
                3: Constants.W.damage.base,
                4: RatioPercent(Constants.W.damage.amp),
                5: Constants.W.bind,
                6: RatioPercent(Constants.W.enhance.shield),
                7: Constants.W.enhance.movement_speed.duration,
                8: RatioPercent(Constants.W.enhance.movement_speed.effect)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.shield.duration,
                1: Constants.W.shield.effect,
                2: Constants.W.damage,
                3: Constants.W.bind,
                4: RatioPercent(Constants.W.enhance.shield),
                5: Constants.W.enhance.movement_speed.duration,
                6: RatioPercent(Constants.W.enhance.movement_speed.effect)
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
