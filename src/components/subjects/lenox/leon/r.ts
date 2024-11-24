import Constants from "./constants.json";
import { TooltipInfo } from "../../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../valueratio-to-string";

export const code = 1029500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.damage.base,
        5: RatioPercent(Constants.R.damage.amp),
        6: Constants.R.airborne,
        7: Constants.R.wall_damage.base,
        9: RatioPercent(Constants.R.wall_damage.amp),
        20: Constants.R.damage,
        21: Constants.R.wall_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CollisionDamage", values: Constants.R.wall_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
