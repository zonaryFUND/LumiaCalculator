import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1022100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.T.subject_kill[skillLevel]}%`,
        2: `${Constants.T.wickline_kill[skillLevel]}%`,
        3: Constants.T.evolution_stack[0],
        4: Constants.T.evolution_stack[1],
        5: Constants.T.evolution_stack[2],
        6: Constants.T.heal_amp_threshold,
        7: Constants.T.heal_amp_per,
        8: "1%",
        9: Constants.T.chicken_bat,
        10: Constants.T.bear,
        11: Constants.T.subject,
        12: Constants.T.wickline,
        14: Constants.T.food_box,
        15: Constants.T.epic_box,
        16: Constants.T.legendary_box,
        17: Constants.T.alpha_omega,
        18: Constants.T.boar_hound_wolf
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HpRegenRatioPlayer", values: Constants.T.subject_kill, percent: true},
            {labelIntlID: "ToolTipType/HpRegenRatioWickline", values: Constants.T.wickline_kill, percent: true}
        ]  
    })
}
