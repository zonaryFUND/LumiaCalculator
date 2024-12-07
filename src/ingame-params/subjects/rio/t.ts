import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { additionalPenetration } from "./status-override";
import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import { UniqueValueStrategy } from "../unique-value-strategy";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";

export const code = 1031100;

function rioBasicAttackMultiplier(status: Status): Decimal {
    const base = Constants.T.basic_attack_damage.base;
    const multiplied = new Decimal(Constants.T.basic_attack_damage.criticalBase).add(status.criticalStrikeDamage.calculatedValue)

    return new Decimal(base)
        .add(status.criticalStrikeChance.calculatedValue.mul(multiplied).div(100))
}

export function RioTStrategy(bow: "daikyu" | "hankyu" | "hankyu-2"): UniqueValueStrategy {
    return (config, status) => {
        const bowRatio = (() => {
            switch (bow) {
                case "daikyu":      return Constants.Q.daikyu.attack;
                case "hankyu":      return Constants.Q.hankyu.attack;
                case "hankyu-2":    return Constants.Q.hankyu.attack * 2;
            }
        })();
        const tRatio = rioBasicAttackMultiplier(status);
        const value = status.attackPower.calculatedValue
            .percent(bowRatio)
            .addPercent(status.increaseBasicAttackDamageRatio.calculatedValue)
            .percent(tRatio)

        return {
            value,
            equationExpression: bow == "hankyu-2" ? [] : [
                {
                    labelIntlID: "app.standard-value",
                    expression: [
                        {ratioKey: "attack"},
                        `${status.attackPower.calculatedValue.toString()} x ${bowRatio}% x (`,
                        {ratioKey: "basicAttackAmp"},
                        `${status.increaseBasicAttackDamageRatio.calculatedValue.toString()}% + 1) = ${value.toString()}`
                    ]
                },
                {
                    labelIntlID: "subject.rio.passive-penetration",
                    expression: [
                        `${Constants.T.basic_attack_damage.base}% + (`,
                        {ratioKey: "criticalChance"},
                        `${status.criticalStrikeChance.calculatedValue.toString()}% x (${BaseCriticalDamagePercent}% + `,
                        {ratioKey: "criticalDamage"},
                        `${status.criticalStrikeDamage.calculatedValue.toString()}%)) = ${tRatio}%`
                    ]
                }
            ]
        }
    }
} 

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation, config, status }) => {
        const base = {
            0: 3
        }
        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.T.defense_decline.criticalChance),
                1: RatioPercent(Constants.T.basic_attack_damage.base),
                2: "1%",
                3: RatioPercent(Constants.T.defense_decline.base),
                4: RatioPercent(Constants.T.basic_attack_damage.criticalBase)
            }
        } else {
            return {
                0: RatioPercent(additionalPenetration(config.skillLevels.T, status.criticalStrikeChance.calculatedValue).toString()),
                1: RatioPercent(rioBasicAttackMultiplier(status).floor().toNumber())
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.T.defense_decline.base, percent: true}
        ]  
    })
}


