import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3021000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: RatioPercent(Constants.damage.additionalAttack),
                1: RatioPercent(Constants.damage.amp),
                2: Constants.damage.base
            }
        } else {   
            return {
                0: Constants.damage
            }
        }
    }, 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.damage.amp, percent: true}
        ]  
    })
}
