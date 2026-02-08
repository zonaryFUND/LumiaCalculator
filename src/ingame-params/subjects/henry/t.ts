import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1083100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.time_bound,
        1: RatioPercent(Constants.T.threshold),
        2: Constants.T.timer,
        3: Constants.T.damage,
        4: RatioPercent(Constants.T.damage.targetLostHP),
        20: Constants.T.damage.base,
        21: RatioPercent(Constants.T.damage.amp)
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.T.unexploded_cooldown_reduction)
        },
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base },
            { labelIntlID: "ToolTipType/ProportionLostHP", values: Constants.T.damage.targetLostHP, percent: true },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown }
        ]
    })
}
