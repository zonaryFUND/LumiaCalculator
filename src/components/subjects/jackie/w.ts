import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1001300;

const maxHeal = {
    base: Constants.W.heal.base.map(v => v * 2),
    attack: Constants.W.heal.attack * 2
}

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.W.movement_speed.duration,
            1: RatioPercent(Constants.W.movement_speed.effect),
            4: RatioPercent(Constants.W.additional_movement_speed)
        }
        if (showEquation) {
            return {
                ...base,
                2: Constants.W.heal.base,
                3: maxHeal.base,
                5: RatioPercent(Constants.W.heal.attack),
                7: RatioPercent(maxHeal.attack)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: Constants.W.heal,
                3: maxHeal,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.W.heal_max_hp)  
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ChaseMoveSpeed", values: Constants.W.additional_movement_speed, percent: true},
            {labelIntlID: "ToolTipType/Heal", values: Constants.W.heal.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
