import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1050100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: `${Constants.T.slow}%`,
            1: Constants.T.frozen,
            2: Constants.T.stun
        }

        if (showEquation) {
            return {
                ...base,
                3: Constants.T.damage.base[skillLevel],
                6: `${Constants.T.damage.defense}%`,
                7: `${Constants.T.damage.amp}%`,
                8: Constants.T.chill
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.T.damage,
                6: Constants.T.chill
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.T.immune
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
