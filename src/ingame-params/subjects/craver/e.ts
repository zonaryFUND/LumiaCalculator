import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1089400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.E.damage,
        1: RatioPercent(Constants.E.cooldown_reduction),
        2: RatioPercent(Constants.E.cooldown_reduction_animal),
        3: Constants.E.enhanced_damage,
        20: Constants.E.damage.base,
        21: RatioPercent(Constants.E.damage.amp),
        22: Constants.E.enhanced_damage.base,
        23: RatioPercent(Constants.E.enhanced_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CraverE1Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CraverE2Damage", values: Constants.E.enhanced_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
