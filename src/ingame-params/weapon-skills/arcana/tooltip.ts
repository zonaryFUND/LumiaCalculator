import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 3024000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }) => ({
        0: Constants.count,
        10: Constants.damage.base,
        11: RatioPercent(Constants.damage.amp),
        12: RatioPercent(Constants.animal_enhance),
        20: Constants.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
