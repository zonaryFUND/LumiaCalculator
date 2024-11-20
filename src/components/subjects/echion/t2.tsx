import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1044112;

export const info: TooltipInfo = {
    skill: "T",
    overrideIntlID: {
        desc: "Skill/Group/Evolution/Desc/1044112",
        coef: "Skill/Group/EvolutionCoef/Desc/1044112"
    },
    values: ({ skillLevel, showEquation, config }) => ({
        0: Constants.T2_2.additional_gauge,
        1: Constants.T2_2.overflow_extend,
        2: `${Constants.R2.skill_lifesteal[config.skillLevels.R]}%`
    }),
    expansion: () => ({
        enumeratedValues: [] 
    })
}
