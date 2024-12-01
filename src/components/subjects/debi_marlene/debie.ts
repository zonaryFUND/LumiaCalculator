import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1065400;

export const info: TooltipProps = {
    skillKey: "E",
    cooldown: Constants.DebiE.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.DebiE.damage.base : Constants.DebiE.damage,
        1: showEquation ? RatioPercent(Constants.DebiE.damage.additionalAttack) : Constants.DebiE.slow_after,
        2: Constants.DebiE.slow.duration,
        3: showEquation ? Constants.DebiE.slow_after : Constants.DebiE.debi_remain,
        4: showEquation ? Constants.DebiE.slow.duration : Constants.DebiE.second_damage,
        5: showEquation ? Constants.DebiE.debi_remain : Constants.DebiE.airborne,
        6: showEquation ? Constants.DebiE.second_damage.base : RatioPercent(Constants.E.movement_speed.effect),
        7: showEquation ? RatioPercent(Constants.DebiE.second_damage.additionalAttack) : Constants.E.movement_speed.duration,
        8: RatioPercent(Constants.DebiE.slow.effect),
        9: Constants.DebiE.airborne,
        10: RatioPercent(Constants.E.movement_speed.effect),
        11: Constants.E.movement_speed.duration,
        12: RatioPercent(Constants.DebiE.slow.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MarleneSkill03Damage", values: Constants.DebiE.damage.base},
            {labelIntlID: "ToolTipType/DebiSkill03Damage", values: Constants.DebiE.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.DebiE.cooldown.constant}
        ]  
    })
}
