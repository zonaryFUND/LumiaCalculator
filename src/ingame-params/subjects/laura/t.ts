import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1047100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.damage.base,
        1: RatioPercent(Constants.T.damage.amp),
        2: RatioPercent(Constants.T.attack_speed),
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base}
        ]  
    })
}
