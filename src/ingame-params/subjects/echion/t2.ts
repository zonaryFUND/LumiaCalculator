import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1044112;

export const info: SkillTooltipProps = {
    skillKey: "T",
    overrideIntlID: {
        desc: "Skill/Group/Evolution/Desc/1044112",
        coef: "Skill/Group/EvolutionCoef/Desc/1044112"
    },
    values: ({ config }) => ({
        0: Constants.T2_2.additional_gauge,
        1: Constants.T2_2.overflow_extend,
        2: RatioPercent(Constants.R2.skill_lifesteal[config.skillLevels.R])
    }),
    expansion: () => ({
        enumeratedValues: [] 
    })
}
