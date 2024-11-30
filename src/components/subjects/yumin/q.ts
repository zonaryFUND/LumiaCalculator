import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1077200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.Q.second_hit),
        1: Constants.Q.vortex_tick,
        2: Constants.Q.damage.base,
        3: RatioPercent(Constants.Q.damage.amp),
        4: Constants.Q.vortex_damage.base,
        5: RatioPercent(Constants.Q.vortex_damage.amp),
        20: Constants.Q.damage,
        21: Constants.Q.vortex_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/YuMinWindFieldSkillDamage", values: Constants.Q.vortex_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
