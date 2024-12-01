import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1049400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: {constant: Constants.T.shared_cooldown},
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.attack),
                2: Constants.E.enhanced_damage.base,
                3: RatioPercent(Constants.E.enhanced_damage.attack),
                4: Constants.E.enhanced_damage.level,
                5: Constants.E.cooldown_reduction,
                8: Constants.E.omnisyphon.duration,
                9: Constants.E.omnisyphon.effect.perStack,
                10: RatioPercent(Constants.E.omnisyphon.effect.attack)
            } as Record<number, number | string | ValueRatio>
        } else {
            const minLifeSteal = {
                base: 1,
                attack: Constants.E.omnisyphon.effect.attack
            }
            const maxLifeSteal = {
                base: Constants.T.max_stack,
                attack: Constants.E.omnisyphon.effect.attack
            }

            return {
                0: Constants.E.damage,
                1: Constants.E.enhanced_damage,
                2: Constants.E.cooldown_reduction,
                3: Constants.E.omnisyphon.duration,
                4: RatioPercent(minLifeSteal),
                5: RatioPercent(maxLifeSteal),
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/FinalSequenceDamage", values: Constants.E.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
