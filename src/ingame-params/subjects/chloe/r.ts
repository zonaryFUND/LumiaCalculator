import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1040500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.duration,
        1: RatioPercent(Constants.R.summoned_attack_speed),
        2: RatioPercent(Constants.R.nina_movement_speed),
        3: RatioPercent(Constants.R.we_cooldown_reduction),
        5: `${Constants.R.attacked_damage}`,
        6: RatioPercent(Constants.R.linked_damage),
        7: Constants.R.damage.base,
        8: Constants.R.damage.base.map(v => v * Constants.R.damage_max_multipler)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/LinkLineDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/NinaAttackSpeed", values: Constants.R.summoned_attack_speed, percent: true},
            {labelIntlID: "ToolTipType/NinaMoveSpeed", values: Constants.R.nina_movement_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
