import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1065400;

export const info: TooltipInfo = {
    skill: "E",
    cooldown: Constants.DebiE.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.DebiE.damage.base[skillLevel] : Constants.DebiE.damage,
        1: showEquation ? `${Constants.DebiE.damage.additionalAttack}%` : Constants.DebiE.slow_after,
        2: Constants.DebiE.slow.duration,
        3: showEquation ? Constants.DebiE.slow_after : Constants.DebiE.debi_remain,
        4: showEquation ? Constants.DebiE.slow.duration : Constants.DebiE.second_damage,
        5: showEquation ? Constants.DebiE.debi_remain : Constants.DebiE.airborne,
        6: showEquation ? Constants.DebiE.second_damage.base[skillLevel] : `${Constants.E.movement_speed.effect}%`,
        7: showEquation ? `${Constants.DebiE.second_damage.additionalAttack}%` : Constants.E.movement_speed.duration,
        8: `${Constants.DebiE.slow.effect}%`,
        9: Constants.DebiE.airborne,
        10: `${Constants.E.movement_speed.effect}%`,
        11: Constants.E.movement_speed.duration,
        12: `${Constants.DebiE.slow.effect}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MarleneSkill03Damage", values: Constants.DebiE.damage.base},
            {labelIntlID: "ToolTipType/DebiSkill03Damage", values: Constants.DebiE.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.DebiE.cooldown.constant}
        ]  
    })
}
