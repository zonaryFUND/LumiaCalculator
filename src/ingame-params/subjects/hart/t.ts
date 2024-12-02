import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1008100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.sp,
        1: Constants.T.damage,
        2: RatioPercent(Constants.T.damage.attack)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SoundWaveDamageApCoef", values: Constants.T.damage.attack, percent: true},
            {labelIntlID: "ToolTipType/SpHeal", values: Constants.T.sp}
        ]  
    })
}
