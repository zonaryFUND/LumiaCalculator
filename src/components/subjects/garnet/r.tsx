import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1076500;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.bind,
                1: Constants.R.damage.base[skillLevel],
                2: `${Constants.R.damage.amp}%`,
                3: `${Constants.R.damage.targetHP}%`,
                4: Constants.R.duration,
                5: `${Constants.R.reuse_threshold}%`,
                6: Constants.R.movement_speed.duration,
                7: `${Constants.R.movement_speed.effect}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.bind,
                1: Constants.R.damage,
                2: `${Constants.R.damage.targetHP}%`,
                3: Constants.R.duration,
                4: `${Constants.R.reuse_threshold}%`,
                5: Constants.R.movement_speed.duration,
                6: `${Constants.R.movement_speed.effect}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
