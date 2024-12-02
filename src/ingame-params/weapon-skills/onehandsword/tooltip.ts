import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3015000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.cloak.duration,
            1: RatioPercent(Constants.cloak.movement_speed),
            4: RatioPercent(Constants.dagger.true_damage.targetHP),
            5: Constants.dagger.slow.duration,
            6: RatioPercent(Constants.dagger.slow.effect)
        }
        if (showEquation) {
            return {
                ...base,
                3: RatioPercent(Constants.dagger.damage.additionalAttack),
                7: RatioPercent(Constants.dagger.damage.amp),
                8: Constants.dagger.damage.base
            }
        } else {
            return {
                ...base,
                3: Constants.dagger.damage
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.dagger.damage.base},
            {labelIntlID: "ToolTipType/Time", values: Constants.cloak.duration},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.dagger.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
