import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1085200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    charge: Constants.Q.charge,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            1: Constants.Q.slow.duration,
            2: RatioPercent(Constants.Q.slow.effect),
            3: RatioPercent(Constants.Q.enhance.additional_damage.gauge),
            4: Constants.Q.enhance.stun,
            5: Constants.Q.enhance.after_effect.tick,
            6: Constants.Q.enhance.after_effect.tick,
            7: Constants.Q.enhance.after_effect.damage,
            8: RatioPercent(Constants.Q.enhance.after_effect.damage.targetMaxHP),
            9: Constants.Q.enhance.after_effect.slow.duration,
            10: RatioPercent(Constants.Q.enhance.after_effect.slow.effect)
        }

        if (showEquation) {
            return {
                ...common,
                0: Constants.Q.damage.base,
                20: RatioPercent(Constants.Q.damage.amp),
                21: RatioPercent(Constants.Q.damage.maxHP)
            }
        } else {
            return {
                ...common,
                0: Constants.Q.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/MirkaActive1_2_Damage", values: Constants.Q.enhance.after_effect.damage.base},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.Q.charge.time}
        ]  
    })
}
