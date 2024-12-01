import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1023200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.Q.damage.base : Constants.Q.damage,
        2: showEquation ? RatioPercent(Constants.Q.additional_damage.amp) : Constants.Q.additional_damage,
        4: RatioPercent(Constants.Q.cooldown_reduction),
        5: RatioPercent(Constants.Q.damage.amp)
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.Q.dual_sword)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.Q.cooldown_reduction, percent: true},
        ]  
    })
}
