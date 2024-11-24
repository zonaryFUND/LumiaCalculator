import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1025200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.Q.damage.base : Constants.Q.damage,
        1: showEquation ? RatioPercent(Constants.Q.damage.attack) : Constants.Q.slow.duration,
        2: showEquation ? Constants.Q.slow.duration : RatioPercent(Constants.Q.slow.effect),
        3: showEquation ? RatioPercent(Constants.Q.slow.effect) : Constants.Q.enhanced_damage,
        4: showEquation ? Constants.Q.enhanced_damage.base : Constants.Q.enhanced_slow.duration,
        5: showEquation ? RatioPercent(Constants.Q.enhanced_damage.attack) : RatioPercent(Constants.Q.enhanced_slow.effect),
        6: Constants.Q.enhanced_slow.duration,
        7: RatioPercent(Constants.Q.enhanced_slow.effect)
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
