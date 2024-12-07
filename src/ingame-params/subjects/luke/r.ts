import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022500;

const maxDamage = {
    base: Constants.R.damage.base.map(v => v * Constants.R.max_multiplier),
    additionalAttack: Constants.R.damage.additionalAttack * Constants.R.max_multiplier
}

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.R.max_stack,
                1: Constants.R.stack_damage.base,
                2: RatioPercent(Constants.R.stack_damage.attack),
                3: RatioPercent(Constants.R.stack_damage.targetMaxHP),
                4: Constants.R.stack_slow.duration,
                5: RatioPercent(Constants.R.stack_slow.effect),
                6: Constants.R.damage.base,
                7: RatioPercent(Constants.R.damage.additionalAttack),
                8: maxDamage.base,
                9: RatioPercent(maxDamage.additionalAttack),
                10: Constants.R.slow.duration,
                11: RatioPercent(Constants.R.slow.effect),
                12: Constants.R.vision,
                13: RatioPercent(Constants.R.evoluted_slow)
            }
        } else {
            return {
                0: Constants.R.max_stack,
                1: Constants.R.stack_damage,
                2: "0%",
                3: Constants.R.stack_slow.duration,
                4: RatioPercent(Constants.R.stack_slow.effect),
                5: Constants.R.damage,
                6: maxDamage,
                7: Constants.R.slow.duration,
                8: RatioPercent(Constants.R.slow.effect),
                9: Constants.R.vision,
                10: RatioPercent(Constants.R.evoluted_slow)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.R.stack_slow.effect, percent: true}
        ]  
    })
}
