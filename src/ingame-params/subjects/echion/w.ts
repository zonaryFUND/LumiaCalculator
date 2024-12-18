import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import Decimal from "decimal.js";
import { weaponType } from "./weapon-type";
import { UniqueValueStrategy } from "../unique-value-strategy";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1044300;

export const EchionWStrategy: UniqueValueStrategy = ({ config, status }) => {
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

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: ({ config, status }) => {
        return new Decimal(Constants.W.cooldown[config.skillLevels.W])
            .subPercent(weaponType(config.equipment.Weapon) == "sidewinder" ? Constants.T1_2.w_cooldown_reduction : 0)
            .subPercent(status.cooldownReduction.calculatedValue);
    },
    values: ({ showEquation }) => ({
        0: Constants.W.gauge_max_consumption,
        1: showEquation ? Constants.W.shield.base : Constants.W.shield,
        2: showEquation ? RatioPercent(Constants.W.shield.attack) : RatioPercent(Constants.W.multiplier),
        3: showEquation ? RatioPercent(Constants.W.multiplier) : RatioPercent(Constants.W.return_threshold),
        4: showEquation ? RatioPercent(Constants.W.return_threshold) : RatioPercent(Constants.W.return_gauge),
        5: RatioPercent(Constants.W.return_gauge)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/VFPayback", values: Constants.W.return_gauge, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
