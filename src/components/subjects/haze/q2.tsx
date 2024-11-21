import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import * as Q from "./q";

export const code = 1058210;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q2.sp_cost
    },
    values: ({ skillLevel, showEquation }) => {
        const {amp_per_ammo, ...withoutAmmo} = Constants.Q2.damage
        return {
            0: Constants.Q2.cast,
            1: withoutAmmo,
            2: `${amp_per_ammo}%`,
            20: Constants.Q2.damage.base[skillLevel],
            22: `${Constants.Q2.damage.amp}%`
        }
    },
    expansion: Q.info.expansion
}
