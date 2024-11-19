import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1066100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        1: showEquation ? Constants.T.heal.base[skillLevel] : Constants.T.heal,
        2: Constants.T.max_stack[skillLevel],
        3: `${Constants.T.heal.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.base},
            {labelIntlID: "ToolTipType/ArdaPassiveStack", values: Constants.T.max_stack},
        ]  
    })
}
