import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1089300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.W.damage,
        1: Constants.W.slow.duration,
        2: RatioPercent(Constants.W.slow.effect),
        3: RatioPercent(Constants.W.movement_speed),
        4: RatioPercent(Constants.W.damage_reduction),
        5: RatioPercent(Constants.W.cooldown_reduction),
        6: Constants.W.enhanced_damage,
        7: Constants.W.airborne,
        20: Constants.W.damage.base,
        21: RatioPercent(Constants.W.damage.amp),
        22: Constants.W.enhanced_damage.base,
        23: RatioPercent(Constants.W.enhanced_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CraverW1Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CraverW2Damage", values: Constants.W.enhanced_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
