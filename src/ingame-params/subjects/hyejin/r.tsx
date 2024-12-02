import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1012500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.first_damage.base,
                2: RatioPercent(Constants.R.first_damage.amp),
                3: Constants.R.duration,
                4: Constants.R.card_damage.base,
                6: RatioPercent(Constants.R.card_damage.amp),
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.first_damage,
                1: Constants.R.duration,
                2: Constants.R.card_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: `${Constants.R.movement_speed_penalty}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/ProjectileDamage", values: Constants.R.card_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
