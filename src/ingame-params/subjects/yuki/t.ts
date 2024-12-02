import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1011100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.damage.base    
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TrueDamage", values: Constants.T.damage.base}
        ]  
    })
}
