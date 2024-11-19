import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { additionalAmp } from "./status-override";

export const code = 1043100;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation, status }) => ({
        0: Constants.T.count,
        1: Constants.T.damage,
        2: `${Constants.T.damage.amp[skillLevel]}%`,
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
