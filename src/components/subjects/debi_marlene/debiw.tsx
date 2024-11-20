import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import Decimal from "decimal.js";

export const code = 1065300;

export const info: TooltipInfo = {
    skill: "W",
    cooldown: ({ status }) => {
        // NOTE: This multiplier is an estimated value.
        // The cooldown reduction of DebiW peaks when her additional attack speed reaches 100%, 
        // at which point it becomes 35% of the original cooldown.
        return new Decimal(Constants.DebiW.cooldown)
            .subPercent(status.attackSpeed.additional?.clamp(0, 100).times(0.65) ?? 0)
            .subPercent(status.cooldownReduction.calculatedValue).round2();
    },
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.DebiW.damage.base[skillLevel] : Constants.DebiW.damage,
        1: showEquation ? `${Constants.DebiW.damage.additionalAttack}%` : `${Constants.DebiW.damage.targetMaxHP[skillLevel]}%`,
        3: `${Constants.DebiW.damage.targetMaxHP[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.DebiW.damage.base},
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.DebiW.damage.targetMaxHP, percent: true}
        ]  
    })
}
