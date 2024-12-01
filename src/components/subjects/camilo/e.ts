import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1039400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.E.damage.base : Constants.E.damage,
        1: showEquation ? RatioPercent(Constants.E.damage.attack) : Constants.E.onestep_duration,
        2: showEquation ?  Constants.E.onestep_duration: Constants.E.second_damage,
        3: showEquation ? Constants.E.second_damage.base : Constants.E.twostep_duration,
        4: RatioPercent(Constants.E.second_damage.attack),
        5: Constants.E.twostep_duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/OneStep", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/TwoStep", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/TwoStepDebuffTime", values: Constants.E.twostep_duration},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
        ]  
    })
}
