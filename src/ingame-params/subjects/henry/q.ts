    import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1083200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const common: TooltipValues = {
            2: Constants.Q.reuse,
            3: RatioPercent(Constants.Q.second_hit_multiplier),
            4: RatioPercent(Constants.Q.reuse_damage.targetMaxHP),
            5: Constants.Q.damage,
            6: Constants.Q.reuse_damage,
            7: Constants.Q.additional_damage.level,
            8: Constants.Q.reuse_additional_damage.level,
            20: Constants.Q.damage.base,
            21: RatioPercent(Constants.Q.damage.amp),
            22: Constants.Q.reuse_damage,
            23: RatioPercent(Constants.Q.reuse_damage.amp)
        }

        if (showEquation) {
            return {
                ...common,
                0: Constants.Q.additional_damage.base,
                1: Constants.Q.reuse_additional_damage.base
            }
        } else {
            return {
                ...common,
                0: Constants.Q.additional_damage,
                1: Constants.Q.reuse_additional_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Henry1_1Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Henry1_2Damage", values: Constants.Q.reuse_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
