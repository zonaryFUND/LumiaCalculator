import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1016800;

export const info: TooltipProps = {
    skillKey: "E",
    cooldown: Constants.BikeE.cooldown,
    values: ({ }) => ({
        0: Constants.BikeE.damage.base,
        3: 0,
        4: Constants.BikeE.ms_max_damage,
        5: RatioPercent(Constants.BikeE.damage.amp),
        20: Constants.BikeE.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.BikeE.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.BikeE.cooldown},
            {labelIntlID: "ToolTipType/DefaultMoveDamageRatio", values: Constants.BikeE.ms_max_damage}
        ]  
    })
}
