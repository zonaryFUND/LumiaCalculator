import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1026200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    charge: Constants.Q.charge,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.Q.hp.base : Constants.Q.hp,
        1: Constants.Q.charge.max,
        2: showEquation ? Constants.Q.charge.max : Constants.Q.duration,
        3: showEquation ? Constants.Q.duration : Constants.Q.railgun_count,
        4: showEquation ? Constants.Q.railgun_count : Constants.Q.railgun_charge,
        5: showEquation ? Constants.Q.railgun_charge : Constants.Q.w_cooldown_reduction,
        6: Constants.Q.w_cooldown_reduction,
        7: Constants.Q.hp.level
    }),
    expansion: ({ }) => ({
        tipValues: {
            0: Constants.Q.damage.base,
            1: RatioPercent(Constants.Q.damage.amp),
            2: Constants.Q.railgun_damage.base,
            3: RatioPercent(Constants.Q.railgun_damage.amp),
            4: Constants.Q.sentry_defence
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TurretNormalAttack", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/TurretRailgunDamage", values: Constants.Q.railgun_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
