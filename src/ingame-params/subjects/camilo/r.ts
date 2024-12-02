import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Decimal from "decimal.js";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1039500;

export function CamiloRHealStrategy(val: "min" | "max"): UniqueValueStrategy {
    return (config, status) => {
        const base = Constants.R.heal.base[config.skillLevels.R];
        const multiplier = Constants.R.heal.perHit[config.skillLevels.R] * (val == "min" ? 1 : Constants.R.heal.maxHit);
        const value = new Decimal(base).addPercent(multiplier);

        return {
            value,
            equationExpression: [
                {
                    expression: [
                        {intlID: "app.standard-value"},
                        `${base} x (1 + ${multiplier}%) = ${value}`
                    ]
                }
            ]
        }
    }
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
            0: Constants.R.return_time,
        }
        const additionalHealMax = RatioPercent(Constants.R.heal.perHit.map(v => v * Constants.R.heal.maxHit))
        if (showEquation) {
            return {
                ...base,
                1: Constants.R.one_hit_damage.base,
                2: RatioPercent(Constants.R.one_hit_damage.attack),
                3: Constants.R.two_hit_damage.base,
                4: RatioPercent(Constants.R.two_hit_damage.attack),
                8: Constants.R.heal.base,
                9: additionalHealMax,
                10: RatioPercent(Constants.R.heal.perHit),
                11: Constants.R.reuse,
                12: RatioPercent(Constants.R.damage_reduction)
            }
        } else {
            return {
                ...base,
                1: RatioPercent(Constants.R.damage_reduction),
                2: Constants.R.one_hit_damage,
                3: Constants.R.two_hit_damage,
                4: Constants.R.stun,
                5: Constants.R.heal.base,
                6: RatioPercent(Constants.R.heal.perHit),
                7: additionalHealMax,
                8: Constants.R.reuse
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Embeleso1Stack", values: Constants.R.one_hit_damage.base},
            {labelIntlID: "ToolTipType/Embeleso2Stack", values: Constants.R.two_hit_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/HealUpRatio", values: Constants.R.heal.perHit, percent: true},
            {labelIntlID: "ToolTipType/DecreaseReceiveDamageRatio", values: Constants.R.damage_reduction},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
