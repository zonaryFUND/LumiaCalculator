import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1035500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.duration,
        1: Constants.R.damage.base,
        2: RatioPercent(Constants.R.damage.additionalAttack),
        3: Constants.R.slow.duration,
        4: RatioPercent(Constants.R.slow.effect),
        6: Constants.R.kill_stack,
        7: Constants.R.movement_speed.duration,
        8: RatioPercent(Constants.R.movement_speed.effect),
        10: RatioPercent(Constants.R.damage.amp),
        11: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
