import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1056100;

export const info: TooltipProps = {
    skillKey: "T",
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
