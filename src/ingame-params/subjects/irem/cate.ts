import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1061410;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.CatE.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.CatE.damage.base,
                2: RatioPercent(Constants.CatE.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.CatE.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.CatE.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.CatE.cooldown },
        ]
    })
}
