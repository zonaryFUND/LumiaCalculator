import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1007500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.max_charge,
        2: Constants.R.stun,
        3: Constants.R.defense_down.duration,
        4: RatioPercent(Constants.R.defense_down.effect),
        10: Constants.R.min_damage.base,
        11: RatioPercent(Constants.R.min_damage.additionalAttack),
        12: RatioPercent(Constants.R.min_damage.amp),
        13: Constants.R.max_damage.base,
        14: RatioPercent(Constants.R.max_damage.additionalAttack),
        15: RatioPercent(Constants.R.max_damage.amp),
        20: Constants.R.min_damage,
        21: Constants.R.max_damage
    }),
    expansion: () => ({
        tipValues: {
            0: Constants.R.max_later_delay,
            1: RatioPercent(Constants.R.cooldown_payback)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.R.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.R.max_damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.R.defense_down.effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
