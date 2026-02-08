import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1083300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.tick,
        1: RatioPercent(Constants.W.slow),
        2: RatioPercent(Constants.W.cooldown_reduction),
        3: Constants.W.damage,
        4: Constants.W.duration,
        5: RatioPercent(Constants.W.damage.targetMaxHP),
        20: Constants.W.damage.base,
        21: RatioPercent(Constants.W.damage.amp)
    }),
    expansion: () => ({
        tipValues: {
            0: Constants.W.e_extend
        },
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base },
            { labelIntlID: "ToolTipType/MaxHpDamageRatio", values: Constants.W.damage.targetMaxHP, percent: true }
        ]
    })
}
