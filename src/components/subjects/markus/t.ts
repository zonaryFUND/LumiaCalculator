import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1053100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            1: Constants.T.damage,
            3: RatioPercent(Constants.T.damage.targetMaxHP),
            4: Constants.T.shock,
            5: Constants.T.shock_range,
            9: Constants.T.slow.duration,
            10: RatioPercent(Constants.T.slow.effect),
            11: Constants.T.stun
        }
        if (showEquation) {
            return {
                ...base,
                6: Constants.T.additional_damage.base,
                7: RatioPercent(Constants.T.additional_damage.attack)
            }
        } else {
            return {
                ...base,
                6: Constants.T.additional_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ShockDamage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/DashDamage", values: Constants.T.additional_damage.base}
        ]  
    })
}
