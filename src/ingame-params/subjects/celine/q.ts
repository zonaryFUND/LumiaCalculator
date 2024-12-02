import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1043200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    charge: Constants.Q.charge,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        2: Constants.Q.charge.max,
        3: Constants.Q.max_bomb,
        4: RatioPercent(Constants.Q.damage.amp),
        5: RatioPercent(Constants.Q.multiple_bomb_damage_multiplier),
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.Q.charge.time.constant},
        ]  
    })
}
