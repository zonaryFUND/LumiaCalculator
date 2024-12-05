import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1058200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    charge: Constants.Q.charge,
    values: ({ }) => ({
        0: Constants.Q.damage,
        20: Constants.Q.damage.base,
        22: RatioPercent(Constants.Q.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Haze_GrenadeDamage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Haze_GrenadeCooldown", values: Constants.Q.charge.time},
            {labelIntlID: "ToolTipType/Haze_SubmachinegunDamage", values: Constants.Q2.damage.base},
            {labelIntlID: "ToolTipType/Haze_AccRocketDamage", values: Constants.Q3.damage.base}
        ]  
    })
}
