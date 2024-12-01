import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1016700;

export const info: TooltipProps = {
    skillKey: "W",
    cooldown: Constants.BikeW.cooldown,
    values: ({ }) => ({
        0: Constants.BikeW.damage.base,
        2: RatioPercent(Constants.BikeW.damage.amp),
        3: Constants.BikeW.airborne,
        20: Constants.BikeW.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.BikeW.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.BikeW.cooldown},
        ]  
    })
}
