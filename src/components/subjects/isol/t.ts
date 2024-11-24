import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1009100;

export const info: TooltipInfo = {
    skill: "T",
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
