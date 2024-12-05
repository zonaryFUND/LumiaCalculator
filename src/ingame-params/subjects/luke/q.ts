import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022200;

const q2Max = {
    base: Constants.Q.second_damage.base.map(v => v * (100 + Constants.Q.enhance_max) / 100),
    additionalAttack: Constants.Q.second_damage.additionalAttack * (100 + Constants.Q.enhance_max) / 100
}

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.Q.first_damage.base,
                1: RatioPercent(Constants.Q.first_damage.additionalAttack),
                3: Constants.Q.reuse,
                4: Constants.Q.second_damage.base,
                5: RatioPercent(Constants.Q.second_damage.additionalAttack),
                6: q2Max.base,
                7: RatioPercent(q2Max.additionalAttack),
                8: Constants.Q.defense_decline.duration,
                9: RatioPercent(Constants.Q.defense_decline.effect)
            }
        } else {
            return {
                0: Constants.Q.first_damage,
                1: Constants.Q.reuse,
                2: Constants.Q.second_damage,
                3: q2Max,
                4: Constants.Q.defense_decline.duration,
                5: RatioPercent(Constants.Q.defense_decline.effect)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BulletDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/DashDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
