import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1033400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.damage.base,
        2: Constants.E.slow.duration,
        3: RatioPercent(Constants.E.slow.effect),
        4: Constants.E.e2_damage.base,
        6: Constants.E.slow.duration,
        7: RatioPercent(Constants.E.slow.effect),
        8: Constants.E.stun,
        9: RatioPercent(Constants.E.damage.amp),
        10: RatioPercent(Constants.E.e2_damage.amp),
        20: Constants.E.damage,
        21: Constants.E.e2_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.E.e2_damage.base},
            {labelIntlID: "ToolTipType/KnockoutPunchCooldown", values: Constants.E.cooldown},
        ]  
    })
}
