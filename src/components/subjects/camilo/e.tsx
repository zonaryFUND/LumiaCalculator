import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1039400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.E.damage.base[skillLevel] : Constants.E.damage,
        1: showEquation ? `${Constants.E.damage.attack}%` : Constants.E.onestep_duration,
        2: showEquation ?  Constants.E.onestep_duration: Constants.E.second_damage,
        3: showEquation ? Constants.E.second_damage.base[skillLevel] : Constants.E.twostep_duration[skillLevel],
        4: `${Constants.E.second_damage.attack}%`,
        5: Constants.E.twostep_duration[skillLevel]
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
