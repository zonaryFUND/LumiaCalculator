import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1008200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.Q.charge_threshold,
        2: Constants.Q.min_damage.base,
        3: RatioPercent(Constants.Q.min_damage.attack),
        4: Constants.Q.max_damage.base,
        5: RatioPercent(Constants.Q.max_damage.attack),
        6: RatioPercent(Constants.Q.slow.effect),
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
