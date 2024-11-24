import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1052500;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({ }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ConjunctionSunDamage", values: Constants.R.sun_conjunction.base},
            {labelIntlID: "ToolTipType/ConjunctionMoonDamage", values: Constants.R.moon_conjunction.base},
            {labelIntlID: "ToolTipType/ConjunctionStarHeal", values: Constants.R.star_conjunction.hp.base},
            {labelIntlID: "ToolTipType/ConjunctionStarSp", values: Constants.R.star_conjunction.sp.base}
        ]  
    })
}
