import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";

export const code = 1073500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.channeling,
        1: Constants.R.duration,
        2: Constants.R.amp
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/ApDamage", values: Constants.R.amp}
        ]  
    })
}
