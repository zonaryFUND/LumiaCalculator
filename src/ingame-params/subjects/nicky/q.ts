import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1033200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.Q.movement_speed_penalty),
        1: Constants.Q.min_damage.base,
        3: Constants.Q.max_damage.base,
        5: Constants.Q.q2_damage.base,
        7: Constants.Q.rage,
        8: RatioPercent(Constants.Q.cooldown_reduction),
        9: RatioPercent(Constants.Q.min_damage.amp),
        10: RatioPercent(Constants.Q.max_damage.amp),
        11: RatioPercent(Constants.Q.q2_damage.amp),
        12: Constants.Q.rage.base,
        14: RatioPercent(Constants.Q.rage.amp),
        20: Constants.Q.min_damage,
        21: Constants.Q.max_damage,
        22: Constants.Q.q2_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.Q.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.Q.max_damage.base},
            {labelIntlID: "ToolTipType/AreaDamage", values: Constants.Q.q2_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
