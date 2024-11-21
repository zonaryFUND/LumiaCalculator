import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1055200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base[skillLevel],
                1: `${Constants.Q.damage.maxHP}%`,
                2: `${Constants.Q.damage.amp}%`,
                3: Constants.Q.stun
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                1: Constants.Q.damage,
                2: Constants.Q.stun
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/EstelleAddSkillDamage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
