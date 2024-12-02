import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1012100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
        0: 3,
        1: Constants.T.fear,
        2: showEquation ? RatioPercent(Constants.T.damage.amp) : Constants.T.damage
    }),
    expansion: () => ({
        tipValues: {
            0: Constants.T.fear_immune,
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FearTime", values: Constants.T.fear},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.T.damage.amp, percent: true}
        ]  
    })
}
