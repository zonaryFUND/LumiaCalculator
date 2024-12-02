import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1072200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        3: Constants.Q.min_damage.base,
        4: RatioPercent(Constants.Q.min_damage.attack),
        5: Constants.Q.max_damage.base,
        6: RatioPercent(Constants.Q.max_damage.attack),
        7: Constants.Q.attack_speed.duration,
        8: RatioPercent(Constants.Q.attack_speed.effect),
        20: Constants.Q.min_damage,
        21: Constants.Q.max_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.Q.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.Q.max_damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.Q.attack_speed.effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
