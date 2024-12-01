import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import * as Q from "./q";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1058220;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q2.sp_cost
    },
    values: ({ }) => ({
        0: Constants.Q3.damage,
        1: RatioPercent(Constants.Q3.enhance),
        2: Constants.Q3.slow.duration,
        3: RatioPercent(Constants.Q3.slow.effect),
        20: Constants.Q3.damage.base,
        22: RatioPercent(Constants.Q3.damage.amp)
    }),
    expansion: Q.info.expansion
}
