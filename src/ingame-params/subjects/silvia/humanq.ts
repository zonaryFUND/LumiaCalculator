import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1016200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.HumanQ.sp_cost,
    },
    cooldown: Constants.HumanQ.cooldown,
    values: ({ }) => ({
        0: Constants.HumanQ.damage.base,
        2: Constants.HumanQ.heal,
        6: Constants.HumanQ.fuel_gain,
        7: RatioPercent(Constants.HumanQ.damage.amp),
        8: RatioPercent(Constants.HumanQ.heal.amp),
        9: Constants.HumanQ.damage,
        10: Constants.HumanQ.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.HumanQ.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.HumanQ.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.HumanQ.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.HumanQ.sp_cost}
        ]  
    })
}
