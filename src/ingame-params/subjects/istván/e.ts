import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1080400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        return {
            0: Constants.E.defense_down.duration,
            1: RatioPercent(Constants.E.defense_down.effect),
            2: Constants.E.airborne,
            3: Constants.E.damage.base,
            4: RatioPercent(Constants.E.damage.attack),
            5: Constants.E.variable_damage.base,
            6: RatioPercent(Constants.E.variable_damage.attack),
            20: Constants.E.damage,
            21: Constants.E.variable_damage
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base },
            { labelIntlID: "ToolTipType/IstvanCloneDamage", values: Constants.E.variable_damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
