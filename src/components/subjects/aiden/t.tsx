import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { UniqueValueStrategy } from "../unique-value-strategy";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";

export const AidenTStrategy: UniqueValueStrategy = (config, status) => {
    const regularDamage = status.attackPower.calculatedValue.addPercent(status.basicAttackAmp.calculatedValue)
    const chanceConversionRatio = Constants.T.critical_chance_convert[config.skillLevels.T];
    const multiplier = BaseCriticalDamagePercent
        .add(100)
        .minus(Constants.T.critical_damage)
        .add(status.criticalChance.calculatedValue.mul(chanceConversionRatio));
    const value = regularDamage.percent(multiplier);

    return {
        value: value,
        equationExpression: [
            {
                expression: [
                    {intlID: "基礎値"},
                    `${regularDamage} x `,
                    "(1 + ",
                    {intlID: "T致命打基本値"},
                    `${BaseCriticalDamagePercent.sub(Constants.T.critical_damage).toString()}% + `,
                    {intlID: "T致命打率変換"},
                    `${status.criticalChance.calculatedValue.toString()} x ${chanceConversionRatio}% + `,
                    {ratioKey: "criticalDamage"},
                    `${status.criticalDamage.calculatedValue.toString()}%) = ${value.toString()}`
                ]
            }
        ]
    }
} 

export const code = 1046100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel }) => ({
        1: `${Constants.T.attack_speed}%`,
        2: `${Constants.T.critical_damage}%`,
        3: `${Constants.T.critical_chance_convert[skillLevel]}%`,
        4: Constants.T.duration,
        5: Constants.T.movement_speed.duration,
        6: `${Constants.T.movement_speed.effect[skillLevel]}`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackRange", values: Constants.T.range.map(r => `${r}m`)},
            {labelIntlID: "ToolTipType/AdditionalCriticalDamage", values: Constants.T.critical_chance_convert.map(c => c.toFixed(2)), percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect},
        ]  
    })
}
