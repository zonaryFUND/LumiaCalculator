import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1009200;

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
                0: Constants.Q.duration,
                1: Constants.Q.damage.base,
                2: RatioPercent(Constants.Q.damage.attack),
                3: RatioPercent(Constants.Q.damage.amp),
                4: Constants.Q.bind,
                5: Constants.Q.duration_enemy,
                6: Constants.Q.duration_reduction,
                7: Constants.Q.additional_damage.base,
                8: RatioPercent(Constants.Q.additional_damage.attack),
                9: RatioPercent(Constants.Q.additional_damage.amp),
                10: Constants.Q.additional_bind,
                11: Constants.Q.bind_max
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.duration,
                1: Constants.Q.damage,
                2: Constants.Q.bind,
                3: Constants.Q.duration_enemy,
                4: Constants.Q.duration_reduction,
                5: Constants.Q.additional_damage,
                6: Constants.Q.additional_bind,
                7: Constants.Q.bind_max
            } as Record<number, number | string | ValueRatio>
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.additional_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
