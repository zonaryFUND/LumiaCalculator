import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1071400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.E.duration,
            1: RatioPercent(Constants.E.attack_speed)
        }
        if (showEquation) {
            return {
                ...base,
                3: Constants.E.damage.base,
                4: RatioPercent(Constants.E.damage.attack),
                5: RatioPercent(Constants.E.cooldown_reduction),
                6: RatioPercent(Constants.E.damage_conversion)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.E.damage,
                4: RatioPercent(Constants.E.cooldown_reduction),
                5: RatioPercent(Constants.E.damage_conversion)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.E.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.E.cooldown_reduction, percent: true}
        ]  
    })
}
