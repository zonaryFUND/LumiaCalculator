import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1008200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.Q.charge_threshold,
        2: Constants.Q.min_damage.base[skillLevel],
        3: `${Constants.Q.min_damage.attack}%`,
        4: Constants.Q.max_damage.base[skillLevel],
        5: `${Constants.Q.max_damage.attack}%`,
        6: `${Constants.Q.slow.effect}%`,
        10: showEquation ? Constants.Q.slow.duration : Constants.Q.min_damage,
        11: Constants.Q.max_damage,
        12: Constants.Q.slow.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.Q.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.Q.max_damage.base},
        ]  
    })
}
