import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Decimal from "decimal.js";

export const code = 1089100;

export const CraverTStrategy: UniqueValueStrategy = ({ config, status }) => {
    const base = Constants.T.damage.base[config.skillLevels.T];
    const amp = Constants.T.damage.amp;
    const as = Constants.T.damage.attackSpeed;
    const value = new Decimal(Constants.T.damage.base[config.skillLevels.T])
        .add(status.skillAmp.calculatedValue.percent(amp))
        .add(status.attackSpeed.multiplier.percent(as) ?? 0)

    return {
        value: {
            type: "standard",
            value
        },
        equationExpression: [
            {
                expression: [
                    `${base} + `,
                    { ratioKey: "amp" },
                    `${status.skillAmp.calculatedValue.toString()} x ${amp}% + `,
                    { ratioKey: "additionalAttackSpeed" },
                    `${status.attackSpeed.multiplier.toString() ?? 0} x ${as}% = ${value.toString()}`
                ]
            }
        ]
    }
}


export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.attack_speed,
        1: Constants.T.damage,
        2: Constants.T.reload_time,
        3: Constants.T.reload_duration,
        20: Constants.T.damage.base,
        21: RatioPercent(Constants.T.damage.amp),
        22: RatioPercent(Constants.T.damage.attackSpeed)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CraverPassive1", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CraverPassive2", values: Constants.T.attack_speed}
        ]  
    })
}
