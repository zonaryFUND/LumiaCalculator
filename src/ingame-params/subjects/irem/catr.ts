import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1061510;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.CatR.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: Constants.CatR.shield_duration
        };

        if (showEquation) {
            return {
                ...base,
                0: Constants.CatR.shield.base,
                3: RatioPercent(Constants.CatR.shield.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.CatR.shield
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.CatR.shield.base}
        ]  
    })
}
