import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import Decimal from "decimal.js";

export const code = 1065210;

export const info: TooltipInfo = {
    skill: "Q",
    cooldown: ({ status }) => {
        // NOTE: This multiplier is an estimated value.
        // The cooldown reduction of DebiQ peaks when her additional attack speed reaches 120%, 
        // at which point it becomes 30% of the original cooldown.
        return new Decimal(Constants.MarleneQ.cooldown)
            .subPercent(status.attackSpeed.additional?.clamp(0, 120).times(7).dividedBy(12) ?? 0)
            .subPercent(status.cooldownReduction.calculatedValue).round2();
    },
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.MarleneQ.damage.base[skillLevel] : Constants.MarleneQ.damage,
        1: showEquation ? `${Constants.MarleneQ.damage.additionalAttack}%` : `${Constants.MarleneQ.attack_speed.effect[skillLevel]}%`,
        2: Constants.MarleneQ.attack_speed.duration,
        3: Constants.MarleneQ.max_stack,
        4: Constants.MarleneQ.attack_speed.duration,
        5: `${Constants.MarleneQ.attack_speed.effect[skillLevel]}%`,
        6: Constants.MarleneQ.max_stack,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.MarleneQ.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.MarleneQ.attack_speed.effect, percent: true},
        ]  
    })
}
