import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import Decimal from "decimal.js";

export const code = 1078200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: ({ config, status }) => {
        return new Decimal(Constants.Q.cooldown.constant[config.skillLevels.Q]).subPercent(status.attackSpeed.multiplier.clamp(0, 140).div(140).times(50)).floor2()
    },
    values: ({ showEquation }): TooltipValues  => {
        if (showEquation) {
            return {
                0: Constants.Q.first_damage.base,
                1: RatioPercent(Constants.Q.first_damage.additionalAttack),
                2: Constants.Q.second_damage.base,
                3: RatioPercent(Constants.Q.second_damage.additionalAttack),
                4: RatioPercent(Constants.Q.slow.effect),
                5: Constants.Q.slow.duration
            }
        } else {
            return {
                0: Constants.Q.first_damage,
                1: Constants.Q.second_damage,
                2: RatioPercent(Constants.Q.slow.effect),
                3: Constants.Q.slow.duration
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/FirstAdditionalAttackPower", values: Constants.Q.first_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/SecondAdditionalAttackPower", values: Constants.Q.second_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown.constant}
        ]  
    })
}
