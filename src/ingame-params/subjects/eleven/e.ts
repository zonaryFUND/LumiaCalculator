import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1030400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.E.min_damage.base,
                1: RatioPercent(Constants.E.min_damage.attack),
                2: RatioPercent(Constants.E.min_damage.additionalMaxHP),
                3: Constants.E.max_damage.base,
                4: RatioPercent(Constants.E.max_damage.attack),
                5: RatioPercent(Constants.E.max_damage.additionalMaxHP)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.min_damage,
                1: Constants.E.max_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.common.return_cooldown)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.E.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.E.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
