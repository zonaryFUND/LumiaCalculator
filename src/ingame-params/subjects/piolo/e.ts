import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1056400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                1: Constants.E1.first_min_damage.base,
                3: RatioPercent(Constants.E1.first_min_damage.amp),
                4: Constants.E1.first_max_damage.base,
                6: RatioPercent(Constants.E1.first_max_damage.amp),
                7: Constants.E1.second_min_damage.base,
                9: RatioPercent(Constants.E1.second_min_damage.amp),
                10: Constants.E1.second_max_damage.base,
                12: RatioPercent(Constants.E1.second_max_damage.amp),
                13: Constants.E2.damage.base,
                15: RatioPercent(Constants.E2.damage.amp),
                16: Constants.E2.airborne
            }
        } else {
            return {
                1: Constants.E1.first_min_damage,
                2: Constants.E1.first_max_damage,
                3: Constants.E1.second_min_damage,
                4: Constants.E1.second_max_damage,
                5: Constants.E2.damage,
                6: Constants.E2.airborne
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.E1.movement_speed_penalty
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Piolo_E1_NunchakuMinDamage", values: Constants.E1.first_min_damage.base},
            {labelIntlID: "ToolTipType/Piolo_E1_NunchakuMaxDamage", values: Constants.E1.first_max_damage.base},
            {labelIntlID: "ToolTipType/Piolo_E1_DashMinDamage", values: Constants.E1.second_min_damage.base},
            {labelIntlID: "ToolTipType/Piolo_E1_DashMaxDamage", values: Constants.E1.second_max_damage.base},
            {labelIntlID: "ToolTipType/E2_Damage", values: Constants.E2.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
