import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import Decimal from "decimal.js";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1039200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: ({ status }) => {
        const additionalAttackSpeed = status.attackSpeed.calculatedValue.minus(status.attackSpeed.base ?? 0)

        // NOTE: This multiplier is an estimated value.
        // The cooldown reduction of Q peaks when his attack speed reaches 1.49 (base plus 1.38), 
        // at which point it becomes 30% of the original cooldown.
        // Assuming that the attack speed at which cooldowns saturate is 1.375 before rounding, rather than the displayed value of 1.38, 
        // cooldown aligns much better with in-game displayed values.
        return new Decimal(Constants.Q.cooldown.constant).subPercent(additionalAttackSpeed.clamp(0, 1.375).times(70).dividedBy(1.375)).round2();
    },
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.Q.damage.base : Constants.Q.damage,
        1: showEquation ? RatioPercent(Constants.Q.damage.attack) : Constants.Q.stack_duration,
        2: showEquation ? Constants.Q.stack_duration : Constants.Q.movement_speed.duration,
        3: showEquation ? Constants.Q.movement_speed.duration : RatioPercent(Constants.Q.movement_speed.effect),
        4: showEquation ? RatioPercent(Constants.Q.movement_speed.effect) : Constants.Q.Q2_first_damage,
        5: showEquation ? Constants.Q.Q2_first_damage.base : Constants.Q.Q2_second_damage,
        6: showEquation ? RatioPercent(Constants.Q.Q2_first_damage.attack) : Constants.Q.heal,
        7: showEquation ? Constants.Q.Q2_second_damage.base : Constants.Q.cooldown_reduction_max,
        8: RatioPercent(Constants.Q.Q2_second_damage.attack),
        9: Constants.Q.heal.base,
        10: RatioPercent(Constants.Q.heal.attack),
        11: Constants.Q.cooldown_reduction_max
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.Q.Q2_first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.Q.Q2_second_damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.Q.movement_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/Heal", values: Constants.Q.heal.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
        ]  
    })
}
