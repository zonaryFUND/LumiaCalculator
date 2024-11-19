import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1026400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation, skillLevel }) => ({
        0: showEquation ? Constants.E.damage.base[skillLevel] : Constants.E.damage,
        1: showEquation ? `${Constants.E.damage.amp}%` : Constants.E.stun,
        2: Constants.E.stun
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
