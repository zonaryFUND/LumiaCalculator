import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1020200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            3: Constants.Q.cooldown_reduction,
            4: Constants.Q.max_stack
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.Q.damage.base,
                2: RatioPercent(Constants.Q.additional_damage.maxHP),
                5: RatioPercent(Constants.Q.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: Constants.Q.additional_damage,
                6: Constants.Q.damage,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.Q.additional_damage.maxHP, percent: true}
        ]  
    })
}
