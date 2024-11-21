import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1036500;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.tick,
        1: Constants.R.damage.base[skillLevel],
        2: Constants.R.max_stack,
        3: Constants.R.stack_damage.base[skillLevel],
        5: Constants.R.min_vf,
        6: Constants.R.tick,
        7: Constants.R.vf_consumption,
        8: `${Constants.R.damage.amp}%`,
        9: `${Constants.R.stack_damage.amp}%`,
        20: Constants.R.damage,
        21: Constants.R.stack_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.R.stack_damage.base}
        ]  
    })
}
