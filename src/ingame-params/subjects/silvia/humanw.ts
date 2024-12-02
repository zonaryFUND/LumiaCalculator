import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1016300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.HumanW.sp_cost,
    },
    cooldown: Constants.HumanW.cooldown,
    values: ({ }) => ({
        0: Constants.HumanW.damage.base,
        2: Constants.HumanW.slow.duration,
        3: RatioPercent(Constants.HumanW.slow.effect),
        5: RatioPercent(Constants.HumanW.damage.amp),
        6: Constants.HumanW.fuel_gain,
        20: Constants.HumanW.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.HumanW.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.HumanW.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.HumanW.sp_cost}
        ]  
    })
}
