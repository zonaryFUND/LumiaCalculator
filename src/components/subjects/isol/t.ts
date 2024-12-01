import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 1009100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.duration,
        1: Constants.T.attack,
        2: Constants.T.amp
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackPowerRatio", values: Constants.T.attack},
            {labelIntlID: "StatType/InfluencePoint", values: Constants.T.amp}
        ]  
    })
}
