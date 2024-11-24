import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { additionalAmp } from "./status-override";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1043100;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ status }) => ({
        0: Constants.T.count,
        1: Constants.T.damage,
        2: RatioPercent(Constants.T.damage.amp),
        3: Constants.T.cooldown_conversion,
        4: status.skillAmp.overrideAdditional?.value?.toString() ?? "",
        5: Constants.T.damage.base
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MaxSkillRatio", values: Constants.T.damage.amp, percent: true}
        ]  
    })
}
