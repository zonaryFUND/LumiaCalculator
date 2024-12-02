import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1025300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.W.damage_duration : Constants.W.duration,
        1: showEquation ? Constants.W.damage.base : Constants.W.damage_duration,
        2: showEquation ? RatioPercent(Constants.W.damage.attack) : Constants.W.damage,
        3: Constants.W.bind,
        4: showEquation ? Constants.W.duration : Constants.W.charge.max,
        5: showEquation ? Constants.W.charge.max : Constants.W.setup,
        6: Constants.W.setup
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BleedDanage", values: Constants.W.damage.base}, // typo key
            {labelIntlID: "ToolTipType/Time", values: Constants.W.duration},
            {labelIntlID: "ToolTipType/MaxInstall", values: Constants.W.setup},
            {labelIntlID: "ToolTipType/MaxChargeCount", values: Constants.W.charge.max},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
