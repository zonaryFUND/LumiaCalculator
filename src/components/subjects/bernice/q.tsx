import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1025200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.Q.damage.base[skillLevel] : Constants.Q.damage,
        1: showEquation ? `${Constants.Q.damage.attack}%` : Constants.Q.slow.duration,
        2: showEquation ? Constants.Q.slow.duration : `${Constants.Q.slow.effect[skillLevel]}%`,
        3: showEquation ? `${Constants.Q.slow.effect[skillLevel]}%` : Constants.Q.enhanced_damage,
        4: showEquation ? Constants.Q.enhanced_damage.base[skillLevel] : Constants.Q.enhanced_slow.duration,
        5: showEquation ? `${Constants.Q.enhanced_damage.attack}%` : `${Constants.Q.enhanced_slow.effect[skillLevel]}%`,
        6: Constants.Q.enhanced_slow.duration,
        7: `${Constants.Q.enhanced_slow.effect[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/FettedDecreaseMoveRatio", values: Constants.Q.enhanced_slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
