import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1009300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: Constants.W.duration,
            1: Constants.W.tick,
        }
        if (showEquation) {
            return {
                ...base,
                2: Constants.W.damage.base[skillLevel],
                3: `${Constants.W.damage.attack}%`,
                4: Constants.W.defense_decline[skillLevel],
                6: `${Constants.W.damage.amp}%`,
                7: Constants.W.defense_decline_max,
                8: Constants.W.defense_decline_duration
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: Constants.W.defense_decline[skillLevel],
                3: Constants.W.defense_decline_duration,
                7: Constants.W.damage,
                9: Constants.W.defense_decline_max
            } as Record<number, number | string | ValueRatio>
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefense", values: Constants.W.defense_decline},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
