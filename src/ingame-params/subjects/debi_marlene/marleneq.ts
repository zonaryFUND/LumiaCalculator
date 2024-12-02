import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import Decimal from "decimal.js";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1065210;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: ({ status }) => {
        // NOTE: This multiplier is an estimated value.
        // The cooldown reduction of DebiQ peaks when her additional attack speed reaches 120%, 
        // at which point it becomes 30% of the original cooldown.
        return new Decimal(Constants.MarleneQ.cooldown)
            .subPercent(status.attackSpeed.additional?.clamp(0, 120).times(7).dividedBy(12) ?? 0)
            .subPercent(status.cooldownReduction.calculatedValue).round2();
    },
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.MarleneQ.damage.base : Constants.MarleneQ.damage,
        1: showEquation ? RatioPercent(Constants.MarleneQ.damage.additionalAttack) : RatioPercent(Constants.MarleneQ.attack_speed.effect),
        2: Constants.MarleneQ.attack_speed.duration,
        3: Constants.MarleneQ.max_stack,
        4: Constants.MarleneQ.attack_speed.duration,
        5: RatioPercent(Constants.MarleneQ.attack_speed.effect),
        6: Constants.MarleneQ.max_stack,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.MarleneQ.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.MarleneQ.attack_speed.effect, percent: true},
        ]  
    })
}
