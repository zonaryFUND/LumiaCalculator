import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1015300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "hp",
        value: Constants.W.hp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.duration,
        1: Constants.W.damage.base,
        3: RatioPercent(Constants.W.damage.amp),
        4: Constants.W.damage,
        5: RatioPercent(Constants.W.movement_speed)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Consumehp", values: Constants.W.hp_cost}
        ]  
    })
}
