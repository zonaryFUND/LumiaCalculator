import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import Decimal from "decimal.js";
import { weaponType } from "./weapon-type";
import { UniqueValueStrategy } from "../unique-value-strategy";

export const code = 1044300;

export const EchionWStrategy: UniqueValueStrategy = (config, status) => {
    const value = new Decimal(Constants.W.shield.base[config.skillLevels.W])
        .add(status.attackPower.calculatedValue.percent(Constants.W.shield.attack))
        .add(Math.min(config.gauge, Constants.W.gauge_max_consumption) * Constants.W.multiplier / 100);

    return {
        value,
        equationExpression: [
            {
                expression: [
                    `${Constants.W.shield.base[config.skillLevels.W]} + `,
                    {ratioKey: "attack"},
                    `${status.attackPower.calculatedValue} x ${Constants.W.shield.attack}% + `,
                    `min(${Constants.W.gauge_max_consumption}, `,
                    {intlID: "subject.echion.gauge-consumption"},
                    `${config.gauge}) x ${Constants.W.multiplier}% = ${value.toString()}`
                ]
            }
        ]
    }
}

export const info: TooltipInfo = {
    skill: "W",
    cooldown: ({ config, status }) => {
        return new Decimal(Constants.W.cooldown[config.skillLevels.W])
            .subPercent(weaponType(config.equipment.Weapon) == "sidewinder" ? Constants.T1_2.w_cooldown_reduction : 0)
            .subPercent(status.cooldownReduction.calculatedValue);
    },
    values: ({ skillLevel, showEquation, config }) => ({
        0: Constants.W.gauge_max_consumption,
        1: showEquation ? Constants.W.shield.base[skillLevel] : Constants.W.shield,
        2: showEquation ? `${Constants.W.shield.attack}%` : `${Constants.W.multiplier}%`,
        3: showEquation ? `${Constants.W.multiplier}%` : `${Constants.W.return_threshold}%`,
        4: showEquation ? `${Constants.W.return_threshold}%` : `${Constants.W.return_gauge[skillLevel]}%`,
        5: `${Constants.W.return_gauge[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/VFPayback", values: Constants.W.return_gauge, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
