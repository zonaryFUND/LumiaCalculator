import { RatioPercent } from "components/tooltip/skill/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";

export const code = 3008000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: RatioPercent(Constants.damage.additionalAttack),
                1: RatioPercent(Constants.damage.amp),
                2: Constants.damage.base,
                3: Constants.stun
            }
        } else {
            return {
                0: Constants.damage,
                1: Constants.stun
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
