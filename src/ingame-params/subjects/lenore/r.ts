import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1075500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.duration,
                1: Constants.R.damage_tick,
                2: Constants.R.damage.base,
                3: RatioPercent(Constants.R.damage.amp),
                4: RatioPercent(Constants.R.slow),
                5: Constants.R.max_stack,
                6: Constants.R.finish_damage.base,
                7: RatioPercent(Constants.R.finish_damage.amp),
                8: Constants.R.insane
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.duration,
                1: Constants.R.damage_tick,
                2: Constants.R.damage,
                3: RatioPercent(Constants.R.slow),
                4: Constants.R.max_stack,
                5: Constants.R.finish_damage,
                6: Constants.R.insane
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.R.insane_attack_speed)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DotDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ExplosionDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/InsanityDuration", values: Constants.R.insane},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
