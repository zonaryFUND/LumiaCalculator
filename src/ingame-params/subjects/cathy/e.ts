import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1023400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.E.damage.base : Constants.E.damage,
        1: Constants.E.knockback_damage,
        2: Constants.E.bind,
        3: Constants.E.stun,
        4: Constants.E.knockback_damage.base,
        6: RatioPercent(Constants.E.damage.amp),
        7: RatioPercent(Constants.E.knockback_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.E.knockback_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
