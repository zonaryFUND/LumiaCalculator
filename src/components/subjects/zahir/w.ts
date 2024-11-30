import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1005300;

export const info: TooltipInfo = {
    skill: "W",
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
