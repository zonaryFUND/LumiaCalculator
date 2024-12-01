import Constants from "./constants.json";
import { RatioPercent } from "../../../tooltip/skill/valueratio-to-string";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 1029300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.shield.base,
        2: Constants.W.duration,
        8: RatioPercent(Constants.W.shield.amp),
        10: Constants.W.ally_shield.base,
        12: RatioPercent(Constants.W.ally_shield.amp),
        20: Constants.W.shield,
        22: Constants.W.ally_shield
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/AllyShield", values: Constants.W.ally_shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
