import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1057510;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R2.sp_cost
    },
    cooldown: Constants.R2.cooldown,
    values: ({ }) => ({
        0: Constants.R2.first_outer_damage.base,
        1: RatioPercent(Constants.R2.first_outer_damage.attack),
        2: Constants.R2.first_center_damage.base,
        3: RatioPercent(Constants.R2.first_center_damage.attack),
        4: RatioPercent(Constants.R2.defense_reduction),
        5: Constants.R2.second_outer_damage.base,
        6: RatioPercent(Constants.R2.second_outer_damage.attack),
        7: Constants.R2.second_center_damage.base,
        8: RatioPercent(Constants.R2.second_center_damage.attack),
        9: Constants.R2.stun,
        20: Constants.R2.first_outer_damage,
        21: Constants.R2.first_center_damage,
        22: Constants.R2.second_outer_damage,
        23: Constants.R2.second_center_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Martina_Sector_Damage", values: Constants.R2.first_outer_damage.base},
            {labelIntlID: "ToolTipType/Martina_InSector_Damage", values: Constants.R2.first_center_damage.base},
            {labelIntlID: "ToolTipType/Martina_FinalSector_Damage", values: Constants.R2.second_outer_damage.base},
            {labelIntlID: "ToolTipType/Martina_FinalInSector_Damage", values: Constants.R2.second_center_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R2.cooldown}
        ]  
    })
}
