import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1064500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.damage,
        1: Constants.R.drowsy,
        2: Constants.R.sleep,
        3: Constants.R.wakeup_damage,
        10: Constants.R.damage.base,
        11: RatioPercent(Constants.R.damage.amp),
        12: Constants.R.wakeup_damage.base,
        13: RatioPercent(Constants.R.wakeup_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/VanyaPowderDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/VanyaSleepDamage", values: Constants.R.wakeup_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
