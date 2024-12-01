import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1012500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.first_damage.base[skillLevel],
                2: `${Constants.R.first_damage.amp}%`,
                3: Constants.R.duration,
                4: Constants.R.card_damage.base[skillLevel],
                6: `${Constants.R.card_damage.amp}%`
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
