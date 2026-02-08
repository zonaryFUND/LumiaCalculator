import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1001200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                1: RatioPercent(Constants.Q.damage.attack),
                2: RatioPercent(Constants.Q.damage.targetHP),
                3: RatioPercent(Constants.Q.heal),
                4: RatioPercent(Constants.Q.max_stack_target_additional_damage),
                5: Constants.Q.reuse
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.damage,
                1: RatioPercent(Constants.Q.damage.targetHP),
                2: RatioPercent(Constants.Q.heal),
                3: RatioPercent(Constants.Q.max_stack_target_additional_damage),
                4: Constants.Q.reuse
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown }
        ]
    })
}
