import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1052300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation, config }) => {
        const conjunction = {
            base: Constants.R.moon_conjunction.base[config.skillLevels.R],
            amp: Constants.R.moon_conjunction.amp
        }

        const base = {
            2: Constants.W.slow.duration,
            3: `${Constants.W.slow.effect}`,
            4: Constants.W.moon,
            5: Constants.W.star.duration,
            6: Constants.W.conjunction.slow.duration,
            7: RatioPercent(Constants.W.conjunction.slow.effect)
        }

        if (showEquation) {
            return {
                ...base,
                0: Constants.W.damage.base,
                8: conjunction.base,
                10: RatioPercent(Constants.W.damage.amp),
                11: RatioPercent(conjunction.amp),
                12: Constants.W.sun.base,
                13: RatioPercent(Constants.W.sun.amp),
                14: Constants.W.star.shield.base,
                15: RatioPercent(Constants.W.star.shield.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                20: Constants.W.damage,
                21: conjunction,
                22: Constants.W.sun,
                23: Constants.W.star.shield
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.star.shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
