import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";

export const code = 1051100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.bloom,
        1: Constants.T.flower_duration
    }),
    expansion: () => ({
        enumeratedValues: []  
    })
}
