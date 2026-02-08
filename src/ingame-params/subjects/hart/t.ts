import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1008100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        1: Constants.T.damage,
        2: RatioPercent(Constants.T.damage.attack)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/SoundWaveDamageApCoef", values: Constants.T.damage.attack, percent: true }
        ]
    })
}
