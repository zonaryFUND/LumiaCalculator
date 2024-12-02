import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1044102;

export const info: SkillTooltipProps = {
    skillKey: "T",
    overrideIntlID: {
        desc: "Skill/Group/Evolution/Desc/1044102",
        coef: "Skill/Group/EvolutionCoef/Desc/1044102"
    },
    values: ({ showEquation, config }) => ({
        0: showEquation ? RatioPercent(Constants.T3_2.damage.attack) : Constants.T3_2.damage,
        1: Constants.T3_2.attack_speed_duration,
        2: RatioPercent(Constants.R3.attack_speed[config.skillLevels.R])
    }),
    expansion: () => ({
        enumeratedValues: [] 
    })
}
