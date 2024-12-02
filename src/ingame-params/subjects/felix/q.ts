import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1049200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: {constant: Constants.T.shared_cooldown},
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                1: RatioPercent(Constants.Q.damage.attack),
                2: Constants.Q.enhanced_damage.base,
                3: RatioPercent(Constants.Q.enhanced_damage.attack),
                4: Constants.Q.enhanced_damage.level,
                5: Constants.Q.airborne,
                6: Constants.Q.stack_damage_conversion,
                7: Constants.Q.stack_airborne_extend
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.damage,
                1: Constants.Q.enhanced_damage,
                2: Constants.Q.airborne,
                3: Constants.Q.stack_damage_conversion,
                4: Constants.Q.stack_airborne_extend
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/FinalSequenceDamage", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/LinkedAttackDamage", values: Constants.Q.stack_damage_conversion.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
