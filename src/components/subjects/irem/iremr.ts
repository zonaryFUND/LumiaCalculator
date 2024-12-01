import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1061500;

export const info: TooltipProps = {
    skillKey: "R",
    cooldown: Constants.IremR.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: Constants.IremR.bell,
            2: Constants.common.fish,
            3: Constants.common.fish_max
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.IremR.damage.base,
                5: RatioPercent(Constants.IremR.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.IremR.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.IremR.range_penalty
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ApDamage", values: Constants.IremR.damage.amp},
            {labelIntlID: "ToolTipType/Damage", values: Constants.IremR.damage.base},
        ]  
    })
}
