import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import Decimal from "decimal.js";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1065200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: ({ status }) => {
        // NOTE: This multiplier is an estimated value.
        // The cooldown reduction of DebiQ peaks when her additional attack speed reaches 120%, 
        // at which point it becomes 30% of the original cooldown.
        return new Decimal(Constants.DebiQ.cooldown)
            .subPercent(status.attackSpeed.multiplier.clamp(0, 120).times(7).dividedBy(12) ?? 0)
            .subPercent(status.cooldownReduction.calculatedValue).round2();
    },
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.DebiQ.damage.base : Constants.DebiQ.damage,
        1: showEquation ? RatioPercent(Constants.DebiQ.damage.additionalAttack) : RatioPercent(Constants.DebiQ.attack_speed.effect),
        2: Constants.DebiQ.attack_speed.duration,
        3: Constants.DebiQ.max_stack,
        4: Constants.DebiQ.attack_speed.duration,
        5: RatioPercent(Constants.DebiQ.attack_speed.effect),
        6: Constants.DebiQ.max_stack
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.DebiQ.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.DebiQ.attack_speed.effect, percent: true},
        ]  
    })
}
