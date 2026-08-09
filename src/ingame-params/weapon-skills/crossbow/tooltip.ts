import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3008000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => ({
        0: Constants.damage,
        1: Constants.slow.duration,
        2: RatioPercent(Constants.slow.effect),
        3: Constants.duration,
        4: Constants.blast_damage,
        5: Constants.additional_damage,
        6: Constants.duration_decline_per_attack,
        20: Constants.damage.base,
        21: RatioPercent(Constants.damage.additionalAttack),
        22: RatioPercent(Constants.damage.amp),
        23: Constants.blast_damage.base,
        24: RatioPercent(Constants.blast_damage.additionalAttack),
        25: RatioPercent(Constants.blast_damage.amp),
        26: Constants.additional_damage.base,
        27: RatioPercent(Constants.additional_damage.additionalAttack),
        28: RatioPercent(Constants.additional_damage.amp),
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CrossBowDamage1", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/CrossBowDamage2", values: Constants.blast_damage.base},
            {labelIntlID: "ToolTipType/CrossBowAddtionalApCoef2", values: Constants.blast_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/CrossBowDamage3", values: Constants.additional_damage.base},
            {labelIntlID: "ToolTipType/CrossBowAddtionalApCoef3", values: Constants.additional_damage.additionalAttack, percent: true},
            
        ]  
    })
}
