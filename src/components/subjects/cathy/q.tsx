import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1023200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.Q.damage.base[skillLevel] : Constants.Q.damage,
        2: showEquation ? `${Constants.Q.additional_damage.amp}%` : Constants.Q.additional_damage,
        4: `${Constants.Q.cooldown_reduction[skillLevel]}%`,
        5: `${Constants.Q.damage.amp}%`
    }),
    expansion: () => ({
        tipValues: {
            0: `${Constants.Q.dual_sword}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.Q.cooldown_reduction, percent: true},
        ]  
    })
}
