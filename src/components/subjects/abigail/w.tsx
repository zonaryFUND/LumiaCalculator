import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1067300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel }) => {
        return {
            0: `${Constants.W.additional_shield}%`,
            1: Constants.W.shield.duration,
            2: Constants.W.damage.base[skillLevel],
            3: `${Constants.W.damage.targetHP.base}%`,
            4: `${Constants.W.damage.targetHP.amp}%`,
            5: Constants.W.shield.amount.base[skillLevel],
            6: `${Constants.W.shield.amount.amp}%`,
            7: `${Constants.W.additional_shield_max}%`,
            8: Constants.W.coordinates,
            20: Constants.W.damage,
            21: RatioPercent(Constants.W.damage.targetHP),
            22: Constants.W.shield.amount
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.amount.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
