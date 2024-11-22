import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1069400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation, config, status }) => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base[skillLevel],
                1: Constants.E.damage.level,
                2: `${Constants.E.damage.amp}%`,
                3: Constants.E.stun,
                4: Constants.E.shield.base[skillLevel],
                5: Constants.E.shield.level,
                6: `${Constants.E.shield.amp}%`,
                7: Constants.E.duration
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.damage,
                1: Constants.E.stun,
                2: Constants.E.shield,
                3: Constants.E.duration
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/AllyShield", values: Constants.E.shield.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
