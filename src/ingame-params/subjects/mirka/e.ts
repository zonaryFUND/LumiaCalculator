import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1085400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            0: Constants.E.cc_immune,
            1: RatioPercent(Constants.E.damage_decline),
            3: RatioPercent(Constants.E.first_damage.targetMaxHP),
            4: Constants.E.reuse,
            6: RatioPercent(Constants.E.enhance.additional_damage.gauge),
            7: Constants.E.enhance.knockback
        }

        if (showEquation) {
            return {
                ...common,
                2: Constants.E.first_damage.base,
                5: Constants.E.second_damage.base,
                20: RatioPercent(Constants.E.first_damage.amp),
                21: RatioPercent(Constants.E.second_damage.amp),
                22: RatioPercent(Constants.E.second_damage.maxHP),
            }
        } else {
            return {
                ...common,
                2: Constants.E.first_damage,
                5: Constants.E.second_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DashDamage", values: Constants.E.first_damage.base},
            {labelIntlID: "ToolTipType/AreaDamage", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
