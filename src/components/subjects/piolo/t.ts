import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1056100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ showEquation }) => {
        const base = {
            1: Constants.T.stack_gain,
            2: Constants.T.rest,
            3: Constants.T.additional_stack_gain
        }
        if (showEquation) {
            return {
                ...base,
                4: RatioPercent(Constants.T.damage.amp)
            }
        } else {
            return {
                ...base,
                4: Constants.T.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TrainingResultCount", values: Constants.T.stack_gain},
            {labelIntlID: "ToolTipType/AddTrainingResultCount", values: Constants.T.additional_stack_gain},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.T.damage.amp, percent: true}
        ]  
    })
}
