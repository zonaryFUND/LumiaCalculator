import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1065410;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.MarleneE.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.MarleneE.damage.base : Constants.MarleneE.damage,
        1: showEquation ? RatioPercent(Constants.MarleneE.damage.additionalAttack) : Constants.MarleneE.airborne,
        2: Constants.MarleneE.marlene_remain,
        3: showEquation ? Constants.MarleneE.airborne : Constants.MarleneE.second_damage,
        4: showEquation ? Constants.MarleneE.marlene_remain : Constants.MarleneE.slow_after,
        5: showEquation ? Constants.MarleneE.second_damage.base : Constants.MarleneE.slow.duration,
        6: showEquation ? RatioPercent(Constants.MarleneE.second_damage.additionalAttack) : RatioPercent(Constants.E.movement_speed.effect),
        7: Constants.E.movement_speed.duration,
        8: showEquation ? Constants.MarleneE.slow_after : RatioPercent(Constants.MarleneE.slow.effect),
        9: Constants.MarleneE.slow.duration,
        10: RatioPercent(Constants.E.movement_speed.effect),
        11: Constants.E.movement_speed.duration,
        12: RatioPercent(Constants.MarleneE.slow.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DebiSkill03Damage", values: Constants.MarleneE.damage.base},
            {labelIntlID: "ToolTipType/MarleneSkill03Damage", values: Constants.MarleneE.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.MarleneE.cooldown.constant}
        ]  
    })
}
