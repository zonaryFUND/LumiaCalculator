import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1046300;

const maxConstant = {
    base: Constants.W.damage.base.map(b => b * Constants.W.max_multiplier),
    attack: Constants.W.damage.attack * Constants.W.max_multiplier
}

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        1: RatioPercent(Constants.W.damage.attack),
        2: maxConstant.base,
        3: RatioPercent(maxConstant.attack),
        4: Constants.W.slow.duration,
        5: RatioPercent(Constants.W.slow.effect),
        6: Constants.W.field_duration,
        7: Constants.W.field_damage.base,
        8: RatioPercent(Constants.W.field_damage.attack),
        9: Constants.W.bind,
        20: Constants.W.damage,
        21: maxConstant,
        22: Constants.W.field_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: maxConstant.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.W.field_damage.base},
            {labelIntlID: "ToolTipType/FetterTime", values: Constants.W.bind},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
