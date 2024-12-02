import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1016400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.HumanE.sp_cost,
    },
    cooldown: Constants.HumanE.cooldown,
    values: ({ }) => ({
        0: Constants.HumanE.min_damage.base,
        2: Constants.HumanE.max_damage.base,
        4: Constants.HumanE.knockback_threshold,
        5: Constants.HumanE.fuel_gain.min,
        6: Constants.HumanE.fuel_gain.max,
        7: RatioPercent(Constants.HumanE.min_damage.amp),
        8: RatioPercent(Constants.HumanE.max_damage.amp),
        20: Constants.HumanE.min_damage,
        21: Constants.HumanE.max_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.HumanE.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.HumanE.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.HumanE.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.HumanE.sp_cost}
        ]  
    })
}
