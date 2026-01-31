import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { AdditionalAmp } from "./perpetual-status";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1043100;

export const info: SkillTooltipProps = {
    skillKey: "R",

    cooldown: Constants.R.cooldown,
    values: ({ status }) => ({
        0: Constants.T.count,
        1: Constants.T.damage,
        2: RatioPercent(Constants.T.damage.amp),
        3: Constants.T.cooldown_conversion,
        4: AdditionalAmp(status.cooldownReduction.rawHasteValue).toString(),
        5: Constants.T.damage.base
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MaxSkillRatio", values: Constants.T.damage.amp, percent: true}
        ]  
    })
}
