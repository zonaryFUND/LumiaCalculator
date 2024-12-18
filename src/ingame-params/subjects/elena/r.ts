import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1050500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.outer_damage.base,
                1: RatioPercent(Constants.R.outer_damage.additionalMaxHP),
                3: Constants.R.center_damage.base,
                4: RatioPercent(Constants.R.center_damage.additionalMaxHP),
                5: RatioPercent(Constants.R.outer_damage.amp),
                6: RatioPercent(Constants.R.center_damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.outer_damage,
                1: Constants.R.center_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.outer_damage.base},
            {labelIntlID: "ToolTipType/DamageIcePillar", values: Constants.R.center_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
