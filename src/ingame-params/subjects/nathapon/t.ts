import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Decimal from "decimal.js";

export const code = 1034100;

export const NathaponeTStrategy: UniqueValueStrategy = (config, status) => {
    const base = Constants.T.damage.base[config.skillLevels.T];
    const amp = Constants.T.damage.amp;
    const as = Constants.T.damage.attackSpeed;
    const value = new Decimal(Constants.T.damage.base[config.skillLevels.T])
        .add(status.skillAmp.calculatedValue.percent(amp))
        .add(status.attackSpeed.additional?.percent(as) ?? 0)

    return {
        value,
        equationExpression: [
            {
                expression :[
                    `${base} + `,
                    { ratioKey: "amp" },
                    `${status.skillAmp.calculatedValue.toString()} x ${amp}% +`,
                    { ratioKey: "additionalAttackSpeed" },
                    `${status.attackSpeed.additional?.toString() ?? 0} x ${as}% = ${value}`
                ]
            }
        ]
    }
}

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.T.damage.base,
                1: RatioPercent(Constants.T.damage.attackSpeed),
                2: RatioPercent(Constants.T.damage.amp),
                3: Constants.T.max_stack,
                4: RatioPercent(Constants.T.stack_damage_amp)
            }
        } else {   
            return {
                0: Constants.T.damage,
                1: Constants.T.max_stack,
                2: RatioPercent(Constants.T.stack_damage_amp)
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.E.mark_remain_range
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/IncreaseReceiveDamageRatio", values: Constants.T.stack_damage_amp, percent: true}
        ]  
    })
}
