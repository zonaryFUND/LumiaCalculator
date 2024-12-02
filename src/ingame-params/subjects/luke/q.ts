import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.first_damage.base,
                1: RatioPercent(Constants.Q.first_damage.attack),
                3: Constants.Q.reuse,
                4: Constants.Q.second_damage.base,
                5: RatioPercent(Constants.Q.second_damage.attack),
                7: RatioPercent(Constants.Q.enhance_max),
                8: RatioPercent(Constants.Q.enhance_max_target_hp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.first_damage,
                1: Constants.Q.reuse,
                2: Constants.Q.second_damage,
                3: RatioPercent(Constants.Q.enhance_max),
                4: RatioPercent(Constants.Q.enhance_max_target_hp)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BulletDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/DashDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
