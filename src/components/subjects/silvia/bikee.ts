import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1016800;

export const info: TooltipInfo = {
    skill: "E",
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
