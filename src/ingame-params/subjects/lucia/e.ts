import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1090400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: () => ({
        0: RatioPercent(Constants.E.cooldown_reduction),
        1: Constants.E.q_enhance_duration
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown },
        ]
    })
}
