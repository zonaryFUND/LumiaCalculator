import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1016100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.attack_speed),
        1: 1,
        2: Constants.T.max_skill_amp,
        5: Constants.T.fuel_consumption,
        6: RatioPercent(Constants.T.max_attack_speed),
        8: Constants.T.max_fuel
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackSpeedRatio", values: Constants.T.attack_speed, percent: true}
        ]  
    })
}
