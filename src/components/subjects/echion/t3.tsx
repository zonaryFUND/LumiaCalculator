import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1044102;

export const info: TooltipInfo = {
    skill: "T",
    overrideIntlID: {
        desc: "Skill/Group/Evolution/Desc/1044102",
        coef: "Skill/Group/EvolutionCoef/Desc/1044102"
    },
    values: ({ skillLevel, showEquation, config }) => ({
        0: showEquation ? `${Constants.T3_2.damage.attack}%` : Constants.T3_2.damage,
        1: Constants.T3_2.attack_speed_duration,
        2: `${Constants.R3.attack_speed[config.skillLevels.R]}`
    }),
    expansion: () => ({
        enumeratedValues: [] 
    })
}
