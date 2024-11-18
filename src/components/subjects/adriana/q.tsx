import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1017200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.Q.tick,
        2: Constants.Q.damage.base[skillLevel],
        3: `${Constants.Q.damage.amp[skillLevel]}%`,
        20: Constants.Q.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.Q.damage.amp, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
