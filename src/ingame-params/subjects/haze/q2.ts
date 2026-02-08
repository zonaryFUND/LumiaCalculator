import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import * as Q from "./q";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1058210;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    values: ({ }) => {
        const { amp_per_ammo, ...withoutAmmo } = Constants.Q2.damage
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
