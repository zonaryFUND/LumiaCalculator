import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1059400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.E.time_bound
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.E.damage.base,
                2: RatioPercent(Constants.E.damage.attack),
                4: Constants.E.stun,
                5: Constants.E.defense_down.duration,
                6: RatioPercent(Constants.E.defense_down.effect)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.E.damage,
                2: Constants.E.stun,
                3: Constants.E.defense_down.duration,
                4: RatioPercent(Constants.E.defense_down.effect)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
