import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1089200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.Q.damage,
        1: Constants.Q.enhanced_damage,
        2: Constants.Q.slow.duration,
        3: RatioPercent(Constants.Q.slow.effect),
        4: Constants.Q.additional_damage_duration,
        5: Constants.Q.additional_damage,
        20: Constants.Q.damage.base,
        21: RatioPercent(Constants.Q.damage.amp),
        22: Constants.Q.enhanced_damage.base,
        23: RatioPercent(Constants.Q.enhanced_damage.amp),
        24: Constants.Q.additional_damage.base,
        25: RatioPercent(Constants.Q.additional_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CraverQ1Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/CraverQ2Damage1", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/CraverQ2Damage2", values: Constants.Q.additional_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
