import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1007400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.E.damage.targetHP),
        1: Constants.E.stun,
        2: Constants.E.wall_damage.base,
        3: RatioPercent(Constants.E.damage.additionalAttack),
        7: RatioPercent(Constants.E.wall_damage.additionalAttack),
        8: RatioPercent(Constants.E.damage.amp),
        9: RatioPercent(Constants.E.wall_damage.amp),
        20: Constants.E.damage,
        21: Constants.E.wall_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/PresentHpDamageRatio", values: Constants.E.damage.targetHP},
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.wall_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
