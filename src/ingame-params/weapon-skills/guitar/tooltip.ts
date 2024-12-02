import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3022000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.damage.base,
                1: RatioPercent(Constants.damage.additionalAttack),
                2: RatioPercent(Constants.damage.amp),
                3: RatioPercent(Constants.slow.effect),
                4: Constants.slow.duration
            }
        } else {
            return {
                0: Constants.damage,
                1: RatioPercent(Constants.slow.effect),
                2: Constants.slow.duration
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.damage.amp, percent: true}
        ]  
    })
}
