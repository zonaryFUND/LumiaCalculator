import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1051100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.bloom,
        1: Constants.T.flower_duration
    }),
    expansion: () => ({
        enumeratedValues: []  
    })
}
