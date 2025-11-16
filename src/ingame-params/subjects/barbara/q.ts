import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1026200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    charge: Constants.Q.charge,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.Q.hp.base : Constants.Q.hp,
        1: Constants.Q.charge.max,
        2: showEquation ? Constants.Q.charge.max : Constants.Q.duration,
        3: showEquation ? Constants.Q.duration : Constants.Q.railgun_count,
        4: showEquation ? Constants.Q.railgun_count : Constants.Q.railgun_charge,
        5: showEquation ? Constants.Q.railgun_charge : Constants.Q.w_cooldown_reduction,
        6: RatioPercent(Constants.Q.w_cooldown_reduction),
        7: Constants.Q.hp.level,
        8: Constants.Q.remain,
        9: Constants.Q.retrieve_range
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
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.charge.time}
        ]  
    })
}
