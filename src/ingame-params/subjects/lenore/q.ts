import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1075200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: 5,
                1: Constants.Q.damage.base,
                2: RatioPercent(Constants.Q.damage.amp),
                3: RatioPercent(Constants.Q.additional_damage)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: 5,
                1: Constants.Q.damage,
                2: RatioPercent(Constants.Q.additional_damage)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.Q.same_target_reduction)
        },
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown }
        ]
    })
}
