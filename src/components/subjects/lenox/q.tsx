import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1020200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            3: Constants.Q.cooldown_reduction,
            4: Constants.Q.max_stack
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.Q.damage.base[skillLevel],
                2: `${Constants.Q.additional_damage.maxHP[skillLevel]}%`,
                5: `${Constants.Q.damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: Constants.Q.additional_damage,
                6: Constants.Q.damage,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.Q.additional_damage.maxHP, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
