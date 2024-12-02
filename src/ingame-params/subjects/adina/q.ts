import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1052200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation, config }) => {
        const conjunction = {
            base: Constants.R.sun_conjunction.base[config.skillLevels.R],
            amp: Constants.R.sun_conjunction.amp
        }

        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                2: Constants.Q.moon,
                3: Constants.Q.star.duration,
                4: RatioPercent(Constants.Q.star.movement_speed),
                5: conjunction.base,
                7: RatioPercent(Constants.Q.damage.amp),
                8: RatioPercent(conjunction.amp),
                9: Constants.Q.conjunction.duration,
                10: RatioPercent(Constants.Q.conjunction.damage.targetMaxHP),
                11: Constants.Q.sun.base,
                12: RatioPercent(Constants.Q.sun.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                2: Constants.Q.moon,
                3: Constants.Q.star.duration,
                4: RatioPercent(Constants.Q.star.movement_speed),
                9: Constants.Q.conjunction.duration,
                10: RatioPercent(Constants.Q.conjunction.damage.targetMaxHP),
                20: Constants.Q.damage,
                21: conjunction,
                22: Constants.Q.sun
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
