import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 3003000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.damage.additionalAttack),
        1: Constants.stun,
        2: Constants.damage.base,
        3: Constants.knockback,
        4: RatioPercent(Constants.damage.amp),
        5: RatioPercent(Constants.wall_damage.additionalAttack),
        6: Constants.wall_damage.base,
        7: RatioPercent(Constants.wall_damage.amp),
        20: Constants.damage,
        21: Constants.wall_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.damage.amp, percent: true},
            {labelIntlID: "ToolTipType/WallDamage", values: Constants.wall_damage.base},
            {labelIntlID: "ToolTipType/StunTime", values: Constants.stun}
        ]  
    })
}
