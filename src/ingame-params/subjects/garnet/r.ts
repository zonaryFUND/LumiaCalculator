import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1076500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.bind,
                1: Constants.R.damage.base,
                2: RatioPercent(Constants.R.damage.amp),
                3: RatioPercent(Constants.R.damage.targetHP),
                4: Constants.R.duration,
                5: RatioPercent(Constants.R.reuse_threshold),
                6: Constants.R.movement_speed.duration,
                7: RatioPercent(Constants.R.movement_speed.effect)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.bind,
                1: Constants.R.damage,
                2: RatioPercent(Constants.R.damage.targetHP),
                3: Constants.R.duration,
                4: RatioPercent(Constants.R.reuse_threshold),
                5: Constants.R.movement_speed.duration,
                6: RatioPercent(Constants.R.movement_speed.effect)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
