import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1002300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.W.damage.base[skillLevel] : Constants.W.damage,
        1: showEquation ? `${Constants.W.damage.attack}%` : `${Constants.W.per_as}%`,
        2: Constants.W.duration,
        3: showEquation ? Constants.W.duration : Constants.W.bullets,
        4: showEquation ? Constants.W.bullets : Constants.W.max_bullets,
        5: `${Constants.W.damage.amp[skillLevel]}%`,
        6: Constants.W.per_as,
        7: Constants.W.max_bullets
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.W.damage.amp},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
