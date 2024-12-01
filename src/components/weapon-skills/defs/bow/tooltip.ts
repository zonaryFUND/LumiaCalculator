import { RatioPercent } from "components/tooltip/skill/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 3007000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.after,

        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.damage.base,
                2: RatioPercent(Constants.damage.additionalAttack),
                3: RatioPercent(Constants.slow.effect),
                4: Constants.center_damage.base,
                5: RatioPercent(Constants.center_damage.additionalAttack),
                6: RatioPercent(Constants.damage.amp),
                7: RatioPercent(Constants.center_damage.amp),
                8: Constants.slow.duration
            }
        } else {
            return {
                ...base,
                1: Constants.damage,
                2: RatioPercent(Constants.slow.effect),
                3: Constants.center_damage,
                4: Constants.slow.duration
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/InnerDamage", values: Constants.center_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
