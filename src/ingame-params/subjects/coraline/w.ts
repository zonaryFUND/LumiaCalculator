import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1087300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.W.amp_gain.duration,
        1: RatioPercent(Constants.W.amp_gain.effect),
        2: Constants.W.amp_gain.max_stack,
        4: RatioPercent(Constants.W.cooldown_reduction)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillAmpRatio", values: Constants.W.amp_gain.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolDownReduceRatio", values: Constants.W.cooldown_reduction, percent: true}
        ]  
    })
}
