import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import * as Q from "./q";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1058210;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q2.sp_cost
    },
    values: ({ }) => {
        const {amp_per_ammo, ...withoutAmmo} = Constants.Q2.damage
        return {
            0: Constants.Q2.cast,
            1: withoutAmmo,
            2: RatioPercent(amp_per_ammo),
            20: Constants.Q2.damage.base,
            22: RatioPercent(Constants.Q2.damage.amp)
        }
    },
    expansion: Q.info.expansion
}
