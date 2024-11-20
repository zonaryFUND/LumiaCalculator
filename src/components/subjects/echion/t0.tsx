import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1044100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, config }) => ({}),
    expansion: () => ({
        enumeratedValues: [] 
    })
}
