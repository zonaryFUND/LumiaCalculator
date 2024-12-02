import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.battery_charge,
            1: Constants.T.engagement_ping_range,
            3: RatioPercent(Constants.T.attack_speed_conversion.to),
            4: Constants.T.mark_threshold
        }
        if (showEquation) {
            return {
                ...base,
                5: Constants.T.mark_damage.base,
                6: RatioPercent(Constants.T.mark_damage.attack),
                7: Constants.T.broadcasting_mark_damage.base,
                8: RatioPercent(Constants.T.broadcasting_mark_damage.attack),
                11: RatioPercent(Constants.T.damage.attack),
                12: Constants.T.broadcasting_damage.attack
            }
        } else {
            return {
                ...base,
                11: Constants.T.damage,
                12: Constants.T.broadcasting_damage,
                13: Constants.T.mark_damage,
                14: Constants.T.broadcasting_mark_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Martina_passive_DamageByAttackCoef", values: Constants.T.mark_damage.attack, percent: true},
            {labelIntlID: "ToolTipType/Martina_passive_ReinforcedDamageByAttackCoef", values: Constants.T.broadcasting_mark_damage.attack, percent: true}
        ]  
    })
}
