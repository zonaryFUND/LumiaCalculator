import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1080100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
        ]  
    })
}
