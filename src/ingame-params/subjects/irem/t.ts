import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1061100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.vision,
        1: Constants.T.stay,
        2: RatioPercent(Constants.T.attack_speed),
        3: Constants.T.defense,
        4: RatioPercent(Constants.T.fish_food)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SightRange", values: Constants.T.vision}
        ]  
    })
}
