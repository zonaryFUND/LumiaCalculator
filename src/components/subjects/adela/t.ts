import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { additionalAmp } from "./status-override";

export const code = 1024100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ status, config }) => ({
        0: Constants.T.additional_attack_range,
        1: 0.01,
        2: Constants.T.amp_per_as,
        6: additionalAmp(status.attackSpeed, config).toString() ?? ""
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/SkillAmp", values: Constants.T.amp_per_as},
        ]  
    })
}
