import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1067200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.movement_speed.duration,
        1: RatioPercent(Constants.Q.movement_speed.effect),
        2: Constants.Q.first_damage.base,
        3: RatioPercent(Constants.Q.first_damage.amp),
        4: Constants.Q.second_damage.base,
        5: RatioPercent(Constants.Q.second_damage.amp),
        20: Constants.Q.first_damage,
        21: Constants.Q.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}