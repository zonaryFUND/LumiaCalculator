import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { ValueRatio } from "core/value-ratio";

export const code = 1069100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.T.duration,
                1: Constants.T.damage.base,
                2: Constants.T.damage.level,
                3: Constants.T.cooldown_reduction,
                4: RatioPercent(Constants.T.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.T.duration,
                1: Constants.T.damage,
                2: Constants.T.cooldown_reduction
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base },
            { labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.T.cooldown_reduction }
        ]
    })
}
