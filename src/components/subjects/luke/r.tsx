import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1022500;

const maxDamage = {
    base: Constants.R.damage.base.map(v => v * 2),
    attack: Constants.R.damage.attack * 2
}

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.slow.duration,
                1: `${Constants.R.slow.effect[skillLevel]}%`,
                2: Constants.R.damage.base[skillLevel],
                3: `${Constants.R.damage.attack}%`,
                4: maxDamage.base[skillLevel],
                5: `${maxDamage.attack}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.damage,
                1: maxDamage,
                2: Constants.R.slow.duration,
                3: `${Constants.R.slow.effect[skillLevel]}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.R.slow.effect, percent: true}
        ]  
    })
}
