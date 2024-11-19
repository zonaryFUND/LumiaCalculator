import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1042300;

export const info: TooltipInfo = {
    skill: "W",
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.max_duration,
        1: `${Constants.W.damage_reduction[skillLevel]}`,
        2: Constants.W.heal_tick,
        3: `${Constants.W.heal.maxHP}`,
        4: `${Constants.W.enhance_threshold}%`,
        5: Constants.W.cooldown_reduction.per,
        6: Constants.W.cooldown_reduction.value
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseDamageRatio", values: Constants.W.damage_reduction},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
