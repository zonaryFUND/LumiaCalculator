import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1005300;

export const info: TooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        2: Constants.W.chakram_gain,
        3: Constants.W.charge.max,
        7: RatioPercent(Constants.W.qe_cooldown_reduction),
        8: RatioPercent(Constants.W.damage.amp),
        9: Constants.W.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base}
        ]  
    })
}
