import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { CriticalMultipier, RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1054300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.amp),
                2: Constants.W.slow.duration,
                3: RatioPercent(Constants.W.slow.effect),
                4: Constants.W.gauge,
                5: Constants.W.e_cooldown_reduction,
                6: RatioPercent(Constants.W.damage.attack),
                7: CriticalMultipier(Constants.W.damage.criticalChance),
                8: RatioPercent(Constants.W.damage.criticalChance)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.slow.duration,
                2: RatioPercent(Constants.W.slow.effect),
                3: Constants.W.gauge,
                4: Constants.W.e_cooldown_reduction
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.W.damage_reduction),
            1: RatioPercent(Constants.W.damage.criticalChance)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/KarlaExtraPointModifyCoef", values: Constants.W.gauge},
            {labelIntlID: "ToolTipType/KarlaSkill03CooldownReduce", values: Constants.W.e_cooldown_reduction}
        ]  
    })
}
