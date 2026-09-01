import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1055400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.E.duration,
            1: Constants.E.invulnerable
        }
        if (showEquation) {
            return {
                ...base,
                2: RatioPercent(Constants.E.damage_reduction.base),
                3: RatioPercent(Constants.E.damage_reduction.amp),
                4: Constants.E2.damage.base,
                5: RatioPercent(Constants.E2.damage.maxHP),
                6: RatioPercent(Constants.E2.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: RatioPercent(Constants.E.damage_reduction),
                4: Constants.E2.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.E["self-slow"])
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/EstelleDamageReduction", values: Constants.E.damage_reduction.base, percent: true},
            {labelIntlID: "ToolTipType/EstelleSkillDamage2_2", values: Constants.E2.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
