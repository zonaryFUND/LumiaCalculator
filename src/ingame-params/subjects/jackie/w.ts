import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1001300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.additionalAttack),
                2: Constants.W.slow.duration,
                3: RatioPercent(Constants.W.slow.effect)
            }
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.slow.duration,
                2: RatioPercent(Constants.W.slow.effect)
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.W.dualsword_attack_ratio)
        },
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base },
            { labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.W.damage.additionalAttack, percent: true },
            { labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.slow.effect, percent: true }
        ]
    })
}
