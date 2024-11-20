import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1074200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.movement_speed.duration,
        1: `${Constants.Q.movement_speed.effect}%`,
        2: `${Constants.Q.damage.targetMaxHP[skillLevel]}%`,
        3: Constants.Q.mark,
        4: `${Constants.Q.mark_enhance[skillLevel]}%`,
        5: Constants.Q.damage.base[skillLevel],
        6: `${Constants.Q.damage.attack}%`,
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.Q.damage.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/IncreaseDamageRatio", values: Constants.Q.mark_enhance, percent: true},
        ]  
    })
}
