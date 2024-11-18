import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1024500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.R.damage.base[skillLevel],
        2: Constants.R.channel,
        3: `${Constants.R.per_piece.targetMaxHP}%`,
        4: `${Constants.R.other_pieces}%`,
        5: `${Constants.R.damage.amp}%`,
        20: Constants.R.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
