import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1037500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.duration,
        1: Constants.R.finish_damage.base,
        2: RatioPercent(Constants.R.finish_damage.attack),
        4: Constants.R.damage.base,
        5: RatioPercent(Constants.R.damage.attack),
        6: Constants.R.silence,
        9: Constants.R.window_after_attack,
        20: Constants.R.damage,
        21: Constants.R.finish_damage
    }), 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DotDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/ShadowAttackDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
