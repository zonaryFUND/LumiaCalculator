import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1027800;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.MeleeE.cooldown,
    values: ({ }) => ({
        0: Constants.MeleeE.duration,
        1: RatioPercent(Constants.common.e_as),
        2: Constants.MeleeE.taunt,
        3: 2,
        5: Constants.MeleeE.weapon_swap,
        6: 6,
        20: Constants.MeleeW.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackSpeed", values: Constants.common.e_as, percent: true}
        ]  
    })
}
