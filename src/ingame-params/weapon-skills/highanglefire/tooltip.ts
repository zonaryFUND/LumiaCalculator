import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3005000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
