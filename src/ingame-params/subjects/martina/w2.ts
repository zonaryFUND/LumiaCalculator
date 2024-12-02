import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057310;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W2.sp_cost
    },
    cooldown: Constants.W2.cooldown,
    values: ({ }) => ({
        0: Constants.W2.duration,
        7: Constants.W2.damage.base,
        8: RatioPercent(Constants.W2.damage.attack),
        9: Constants.W2.bind,
        10: Constants.W2.charge.max,
        15: Constants.W2.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W2.damage.base},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W2.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W2.sp_cost}
        ]  
    })
}
