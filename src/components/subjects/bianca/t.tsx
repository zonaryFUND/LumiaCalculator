import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1042100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.slow.duration,
        1: `${Constants.T.slow.effect[skillLevel]}%`,
        2: `${Constants.T.blood_conversion.skill_damage}%`,
        3: `${Constants.T.blood_conversion.lost_hp}%`,
        4: `${Constants.T.max_blood}%`,
        5: `${Constants.T.blood_consumption}%`,
        6: showEquation ? Constants.T.damage.base[skillLevel] : Constants.T.damage,
        8: `${Constants.T.damage.targetMaxHP}%`,
        9: Constants.T.blood_heal_tick,
        10: `${Constants.T.blood_heal_ratio}%`,
        11: `${Constants.T.damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.T.slow.effect},
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
