import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1030200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: RatioPercent(Constants.common.charging_slow_penalty)
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.Q.min_damage.base,
                2: RatioPercent(Constants.Q.min_damage.attack),
                3: RatioPercent(Constants.Q.min_damage.targetMaxHP),
                4: Constants.Q.max_damage.base,
                5: RatioPercent(Constants.Q.max_damage.attack),
                6: RatioPercent(Constants.Q.max_damage.targetMaxHP),
                7: Constants.Q.slow_duration,
                8: RatioPercent(Constants.Q.min_slow),
                9: RatioPercent(Constants.Q.max_slow)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.Q.min_damage,
                2: Constants.Q.max_damage,
                3: Constants.Q.slow_duration,
                4: RatioPercent(Constants.Q.min_slow),
                5: RatioPercent(Constants.Q.max_slow),
                6: RatioPercent(Constants.Q.min_damage.targetMaxHP),
                7: RatioPercent(Constants.Q.max_damage.targetMaxHP)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.common.return_cooldown)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.Q.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.Q.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
