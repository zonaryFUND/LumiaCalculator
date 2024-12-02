import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";

export const code = 1006100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.chicken,
        1: Constants.T.bat_boar,
        2: Constants.T.hound_wolf,
        3: Constants.T.bear,
        4: Constants.T.subject,
        5: Constants.T.max_stack
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AnimalGrade01", values: Constants.T.chicken},
            {labelIntlID: "ToolTipType/AnimalGrade02", values: Constants.T.bat_boar},
            {labelIntlID: "ToolTipType/AnimalGrade03", values: Constants.T.hound_wolf},
            {labelIntlID: "ToolTipType/AnimalGrade04", values: Constants.T.bear},
            {labelIntlID: "ToolTipType/AnimalGrade05", values: Constants.T.subject}
        ]  
    })
}
