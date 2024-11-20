import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1037300;

export const info: TooltipInfo = {
    skill: "W",
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.duration,
        1: Constants.W.slow.duration,
        2: Constants.W.blast_duration,
        3: Constants.W.damage.base[skillLevel],
        4: `${Constants.W.damage.attack}%`,
        7: `${Constants.W.stored_damage[skillLevel]}%`,
        8: Constants.W.vision_decrease,
        12: `${Constants.W.slow.effect}%`,
        20: Constants.W.damage
    }), 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Accumulation", values: Constants.W.stored_damage, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base}
        ]  
    })
}
