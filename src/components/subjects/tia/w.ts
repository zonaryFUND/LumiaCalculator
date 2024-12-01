import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const [y, r, b] = [1048500, 1048510, 1048520];
export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({}),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Cooldown_Yellow", values: Constants.W.y},
            {labelIntlID: "ToolTipType/Cooldown_Red", values: Constants.W.r},
            {labelIntlID: "ToolTipType/Cooldown_Blue", values: Constants.W.b}
        ]  
    })
}
