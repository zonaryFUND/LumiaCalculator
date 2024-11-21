import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import * as Q from "./q";

export const code = 1058220;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q2.sp_cost
    },
    values: ({ skillLevel, showEquation }) => {
        const {amp_per_ammo, ...withoutAmmo} = Constants.Q2.damage
        return {
            0: Constants.Q3.damage,
            1: `${Constants.Q3.enhance}%`,
            2: Constants.Q3.slow.duration,
            3: `${Constants.Q3.slow.effect}%`,
            20: Constants.Q3.damage.base[skillLevel],
            22: `${Constants.Q3.damage.amp}%`
        }
    },
    expansion: Q.info.expansion
}
