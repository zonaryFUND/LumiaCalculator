import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";
import { UniqueValueStrategy } from "../unique-value-strategy";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1065310;

export function projectileAmount(status: Status): number {
    // NOTE: This multiplier is an estimated value.
    // The number of extra projectiles from additional attack speed peaks when it reaches 100%. 
    // Unlike other calculations in-game, this projectile count calculation truncates any decimal places.
    return status.attackPower.additional?.clamp(0, 100).times(0.07).floor().toNumber() ?? 0;
}

export const MarleneWStrategy: UniqueValueStrategy = (config, status) => {
    const base = Constants.MarleneW.projectiles.base[config.skillLevels.W];
    const add = projectileAmount(status);
    const value = new Decimal(base + add);
    return {
        value,
        equationExpression: [
            {
                expression: [
                    `${base} + min(100, `,
                    { ratioKey: "additionalAttackSpeed" },
                    `${status.attackSpeed.additional?.toString()}) x 0.07 = ${value}`
                ]
            }
        ]
    }
}

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: ({ status }) => {
        // NOTE: This multiplier is an estimated value.
        // The cooldown reduction of DebiQ peaks when her additional attack speed reaches 120%, 
        // at which point it becomes 30% of the original cooldown.
        return new Decimal(Constants.MarleneW.cooldown)
            .subPercent(status.attackSpeed.additional?.clamp(0, 100).dividedBy(2) ?? 0)
            .subPercent(status.cooldownReduction.calculatedValue).round2();
    },
    values: ({ showEquation, status }) => {
        const additionalProjectiles = projectileAmount(status);
        return {
            0: Constants.MarleneW.projectiles.base.map(v => showEquation ? 0 : additionalProjectiles),
            1: showEquation ? additionalProjectiles : Constants.MarleneW.damage,
            2: showEquation ? Constants.MarleneW.damage.base : Constants.MarleneW.t_stack_projectiles,
            3: showEquation ? RatioPercent(Constants.MarleneW.damage.additionalAttack) : RatioPercent(Constants.MarleneW.multiple_hit),
            5: Constants.MarleneW.t_stack_projectiles,
            6: RatioPercent(Constants.MarleneW.multiple_hit)
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.MarleneW.max_projectile
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.MarleneW.damage.base},
            {labelIntlID: "ToolTipType/MarleneSkill02Count", values: Constants.MarleneW.projectiles.base}
        ]  
    })
}
