import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1082400;

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
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.attack),
                2: Constants.E.slow.duration,
                3: RatioPercent(Constants.E.slow.effect),
                4: Constants.E.second_damage.base,
                5: RatioPercent(Constants.E.second_damage.base)
            }
        } else {
            return {
                0: Constants.E.damage,
                1: Constants.E.slow.duration,
                2: RatioPercent(Constants.E.slow.effect),
                3: Constants.E.second_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DashDamage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/XuelinActive3Damage", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
