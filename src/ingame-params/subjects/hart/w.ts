import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";

export const code = 1008300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.duration,
        1: Constants.W.attack,
        8: Constants.W.range
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackPower", values: Constants.W.attack},
            {labelIntlID: "ToolTipType/MoveSpeedDowTime", values: Constants.W.duration},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
