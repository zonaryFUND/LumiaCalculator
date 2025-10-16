import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057310;

export const info: SkillTooltipProps = {
    skillKey: "W",
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
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W2.charge.time}
        ]  
    })
}
