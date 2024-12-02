import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1012100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: 3,
        1: Constants.T.fear[skillLevel],
        2: showEquation ? `${Constants.T.damage.amp[skillLevel]}%` : Constants.T.damage
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
