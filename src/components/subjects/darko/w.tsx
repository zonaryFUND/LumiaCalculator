import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1074300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.slow.duration,
        1: `${Constants.W.slow.effect[skillLevel]}%`,
        2: showEquation ? `${Constants.W.additional_shield.maxHP}%` : Constants.W.additional_shield,
        3: Constants.W.attack.duration,
        4: `${Constants.W.attack.effect[skillLevel]}`,
        5: Constants.W.shield.base[skillLevel],
        6: `${Constants.W.shield.attack}%`,
        20: Constants.W.shield
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/DecreaseAttackPower", values: Constants.W.attack.effect},
        ]  
    })
}
