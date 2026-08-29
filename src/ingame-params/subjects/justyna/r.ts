import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1079500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.R.duration,
            1: Constants.R.tick
        }
        if (showEquation) {
            return {
                ...base,
                2: Constants.R.damage.base,
                3: RatioPercent(Constants.R.damage.amp),
                4: RatioPercent(Constants.R.movement_speed_penalty)
            }
        } else {
            return {
                ...base,
                2: Constants.R.damage,
                4: RatioPercent(Constants.R.movement_speed_penalty)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]
    })
}
