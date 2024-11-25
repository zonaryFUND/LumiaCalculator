import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1051100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ }) => ({
        0: Constants.T.bloom,
        1: Constants.T.flower_duration
    }),
    expansion: () => ({
        enumeratedValues: []  
    })
}
