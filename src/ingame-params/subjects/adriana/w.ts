import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1017300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: () => ({
        0: Constants.W.duration,
        1: Constants.W.flame_duration,
        2: RatioPercent(Constants.W.slow)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time}
        ]  
    })
}
