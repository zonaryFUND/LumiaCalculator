import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1061310;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.CatW.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: Constants.CatW.airborne,
            2: Constants.CatW.cooldown_reduction
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.CatW.damage.base,
                4: RatioPercent(Constants.CatW.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.CatW.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.CatW.damage.base }
        ]
    })
}
