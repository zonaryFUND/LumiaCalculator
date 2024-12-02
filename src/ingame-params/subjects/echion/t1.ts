import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1044122;

export const info: TooltipProps = {
    skillKey: "T",
    overrideIntlID: {
        desc: "Skill/Group/Evolution/Desc/1044122",
        coef: "Skill/Group/EvolutionCoef/Desc/1044122"
    },
    values: ({ config }) => ({
        0: RatioPercent(Constants.T1_2.w_cooldown_reduction),
        1: RatioPercent(Constants.R1.skill_damage_add[config.skillLevels.R]),

    }),
    expansion: () => ({
        enumeratedValues: [] 
    })
}
