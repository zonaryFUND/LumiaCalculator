import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084210;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.DoubleBladedSwordQ.cooldown,
    consumption: {
        type: "vp",
        value: Constants.DoubleBladedSwordQ.vp_cost
    },
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.DoubleBladedSwordQ.first_damage.base,
                1: RatioPercent(Constants.DoubleBladedSwordQ.first_damage.attack),
                2: Constants.DoubleBladedSwordQ.second_damage.base,
                3: RatioPercent(Constants.DoubleBladedSwordQ.second_damage.attack),
                4: Constants.DoubleBladedSwordQ.heal.base,
                5: RatioPercent(Constants.DoubleBladedSwordQ.heal.additionalAttack)
            }
        } else {
            return {
                0: Constants.DoubleBladedSwordQ.first_damage,
                1: Constants.DoubleBladedSwordQ.second_damage,
                2: Constants.DoubleBladedSwordQ.heal
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.DoubleBladedSwordQ.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.DoubleBladedSwordQ.second_damage.base},
            {labelIntlID: "ToolTipType/HealAdditionalAttackPower", values: Constants.DoubleBladedSwordQ.heal.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.DoubleBladedSwordQ.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.DoubleBladedSwordQ.vp_cost}
        ]  
    })
}
