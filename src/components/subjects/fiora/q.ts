import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1003200;

const enhanced = {
    base: Constants.Q.damage.base.map((b, i) => b + Constants.Q.additional_damage.base[i]),
    amp: Constants.Q.damage.amp + Constants.Q.additional_damage.amp
}

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        4: RatioPercent(Constants.Q.slow.effect),
        6: Constants.Q.slow.duration,
        7: enhanced.base,
        13: RatioPercent(Constants.Q.damage.amp),
        15: RatioPercent(enhanced.amp),
        16: Constants.Q.damage,
        17: enhanced
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AddDamageEndPoint", values: Constants.Q.additional_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
