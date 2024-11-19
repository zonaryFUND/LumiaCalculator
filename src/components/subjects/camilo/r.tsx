import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Decimal from "decimal.js";

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

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.return_time,
        1: showEquation ? Constants.R.one_hit_damage.base[skillLevel] : `${Constants.R.damage_reduction[skillLevel]}%`,
        2: showEquation ? `${Constants.R.one_hit_damage.attack}%` : Constants.R.one_hit_damage,
        3: showEquation ? Constants.R.two_hit_damage.base[skillLevel] : Constants.R.two_hit_damage,
        4: showEquation ? `${Constants.R.two_hit_damage.attack}%` : Constants.R.stun,
        5: Constants.R.heal.base[skillLevel],
        6: `${Constants.R.heal.perHit[skillLevel]}%`,
        7: showEquation ? Constants.R.stun : `${Constants.R.heal.perHit[skillLevel] * Constants.R.heal.maxHit}%`,
        8: showEquation ? Constants.R.heal.base[skillLevel] : Constants.R.reuse,
        9: `${Constants.R.heal.perHit[skillLevel] * Constants.R.heal.maxHit}%`,
        10: `${Constants.R.heal.perHit[skillLevel]}%`,
        11: Constants.R.reuse,
        12: `${Constants.R.damage_reduction[skillLevel]}%`
    }),
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
