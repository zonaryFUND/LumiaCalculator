import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1056300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W2.damage.base,
        2: RatioPercent(Constants.W2.damage.amp),
        7: Constants.W2.movement_speed,
        8: Constants.W2.damage
    }),
    expansion: () => ({
        tipValues: {
            0: Constants.W1.movement_speed_penalty
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/W2_Damage", values: Constants.W2.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
