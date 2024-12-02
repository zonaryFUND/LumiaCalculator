import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1041200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.heal.base,
                1: RatioPercent(Constants.Q.heal.amp),
                2: Constants.Q.damage.base,
                3: RatioPercent(Constants.Q.damage.amp),
                4: Constants.Q.enhanced_heal.base,
                5: RatioPercent(Constants.Q.enhanced_heal.amp),
                6: Constants.Q.enhanced_damage.base,
                7: RatioPercent(Constants.Q.enhanced_damage.amp),
                8: Constants.Q.bind
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.heal,
                1: Constants.Q.damage,
                2: Constants.Q.enhanced_heal,
                3: Constants.Q.enhanced_damage,
                4: Constants.Q.bind
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.Q.heal.base},
            {labelIntlID: "ToolTipType/IncreaseHeal", values: Constants.Q.enhanced_heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
