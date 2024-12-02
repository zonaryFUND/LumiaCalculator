import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1001500;

const maxDamage = {
    base: Constants.R.finish_damage.base.map(v => v * Constants.R.finish_multiplier_max),
    attack: Constants.R.finish_damage.attack * Constants.R.finish_multiplier_max
}

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.R.duration,
            1: Constants.R.extend,
            2: Constants.R.finish_time
        }
        if (showEquation) {
            return {
                ...base,
                3: Constants.R.damage.base,
                4: RatioPercent(Constants.R.damage.attack),
                6: Constants.R.finish_damage.base,
                7: maxDamage.base,
                8: RatioPercent(Constants.R.finish_damage.attack),
                10: RatioPercent(maxDamage.attack)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.R.damage,
                4: Constants.R.finish_damage,
                5: maxDamage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.R.finish_multiplier_max_hp),
            1: RatioPercent(Constants.R.dualsword_multiplier)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ChainSawDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/Time", values: Constants.R.duration}
        ]  
    })
}
