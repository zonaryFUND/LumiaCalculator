import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1072300;

export const info: TooltipInfo = {
    skill: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        1: Constants.W.enemy_reveal,
        2: Constants.W.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
