import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { UniqueValueStrategy } from "../unique-value-strategy";

export const code = 1007300;

export const hyunwooWDefenseStrategy: UniqueValueStrategy = ({ config, status }) => {
    const base = Constants.W.defense.base[config.skillLevels.W];
    const defRatio = Constants.W.defense.defense;
    const value = status.defense.calculatedValue.div(defRatio).floor().add(base);
    return {
        value,
        equationExpression: [
            {
                expression: [
                    `${base} + `,
                    `floor(`,
                    {ratioKey: "defense"},
                    `${status.defense.calculatedValue} / 10) = ${value.toString()}`
                ]
            }
        ]
    }
}

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.defense.base,
        1: Constants.W.defense.defense,
        2: Constants.W.cc_immune,
        3: Constants.W.duration,
        4: 1,
        5: 1,
        20: Constants.W.defense
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/Defense", values: Constants.W.defense.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
