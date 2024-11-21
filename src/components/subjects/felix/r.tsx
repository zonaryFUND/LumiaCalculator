import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1049500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation, status }) => {
        if (showEquation) {
            return {
                0: Constants.R.min_damage.base[skillLevel],
                1: `${Constants.R.min_damage.attack}%`,
                2: Constants.R.max_damage.base[skillLevel],
                3: `${Constants.R.max_damage.attack}%`,
                4: Constants.R.stun,
                5: Constants.R.stack_gain
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.min_damage,
                1: Constants.R.max_damage,
                2: Constants.R.stun,
                3: Constants.R.stack_gain
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.R.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.R.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
