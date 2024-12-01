import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1036200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            4: Constants.Q.vitalforce,
            7: Constants.Q.cooldown_reduction
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.Q.first_damage.base,
                2: Constants.Q.second_damage.base,
                5: RatioPercent(Constants.Q.first_damage.amp),
                6: RatioPercent(Constants.Q.second_damage.amp),
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                20: Constants.Q.first_damage,
                21: Constants.Q.second_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SphereDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/ExplosionDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
