import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1085300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({    
    }),
    expansion: () => ({
        enumeratedValues: [
        ]  
    })
}
