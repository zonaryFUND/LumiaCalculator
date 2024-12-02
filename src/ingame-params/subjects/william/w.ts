import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1032300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        1: RatioPercent(Constants.W.damage.attack),
        2: Constants.W.mound_duration,
        3: Constants.W.range,
        4: Constants.W.slow.duration,
        5: RatioPercent(Constants.W.slow.effect),
        6: Constants.W.stun,
        20: Constants.W.damage     
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base}
        ]  
    })
}
