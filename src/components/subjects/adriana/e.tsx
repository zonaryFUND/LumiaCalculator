import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1017400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.E.duration,
        1: Constants.E.tick,
        2: `${Constants.E.slow}%`,
        3: Constants.E.damage.base[skillLevel],
        4: `${Constants.E.damage.amp}%`,
        20: Constants.E.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AdrianaBurningAreaDamage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
