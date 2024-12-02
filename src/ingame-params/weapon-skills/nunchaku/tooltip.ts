import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3020000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.min_damage.base,
        1: RatioPercent(Constants.min_damage.additionalAttack),
        2: Constants.max_damage.base,
        3: RatioPercent(Constants.max_damage.additionalAttack),
        5: Constants.stun,
        6: RatioPercent(Constants.min_damage.amp),
        7: RatioPercent(Constants.max_damage.amp),
        8: RatioPercent(Constants.movement_speed_penalty),
        9: Constants.min_damage,
        10: Constants.max_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
