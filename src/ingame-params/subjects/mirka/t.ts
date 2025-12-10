import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { calculateValue } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1085100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
    }),
    expansion: ({ config, status }) => ({
        enumeratedValues: [
        ]  
    })
}
