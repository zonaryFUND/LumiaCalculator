import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { additionalAmp } from "./status-override";

export const code = 1024100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, config, status }) => ({
        0: Constants.T.additional_attack_range,
        1: 0.01,
        2: Constants.T.amp_per_as[skillLevel],
        6: status.skillAmp.overrideAdditional?.value?.toString() ?? ""
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/SkillAmp", values: Constants.T.amp_per_as},
        ]  
    })
}
