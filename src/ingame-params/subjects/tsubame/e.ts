import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";

export const code = 1070400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        1: Constants.E.duration,
        2: Constants.E.reuse
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
