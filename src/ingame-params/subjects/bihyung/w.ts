import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1088300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.attack),
                2: RatioPercent(Constants.W.damage.targetMaxHP),
                3: Constants.W.slow.duration,
                4: RatioPercent(Constants.W.slow.effect),
                5: Constants.W.shield.duration,
                6: Constants.W.shield.effect.base,
                7: RatioPercent(Constants.W.shield.effect.maxHP),
                8: Constants.W.movement_speed.duration,
                9: RatioPercent(Constants.W.movement_speed.effect)
            }
        } else {
            return {
                0: Constants.W.damage,
                1: RatioPercent(Constants.W.damage.targetMaxHP),
                2: Constants.W.slow.duration,
                3: RatioPercent(Constants.W.slow.effect),
                4: Constants.W.shield.duration,
                5: Constants.W.shield.effect,
                6: Constants.W.movement_speed.duration,
                7: RatioPercent(Constants.W.movement_speed.effect)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/TargetMaxHpCoef", values: Constants.W.damage.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.effect.base}
        ]  
    })
}
