import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1091200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.shield.duration,
        1: Constants.Q.shield.effect,
        2: Constants.Q.first_damage,
        3: Constants.Q.reuse,
        4: Constants.Q.stun,
        5: Constants.Q.second_damage,
        20: Constants.Q.shield.effect.base,
        21: RatioPercent(Constants.Q.shield.effect.amp),
        22: RatioPercent(Constants.Q.shield.effect.maxHP),
        23: Constants.Q.first_damage.base,
        24: RatioPercent(Constants.Q.first_damage.amp),
        25: RatioPercent(Constants.Q.first_damage.maxHP),
        26: Constants.Q.second_damage.base,
        27: RatioPercent(Constants.Q.second_damage.amp),
        28: RatioPercent(Constants.Q.second_damage.maxHP)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/SeresQ1Damage", values: Constants.Q.first_damage.base },
            { labelIntlID: "ToolTipType/Shield", values: Constants.Q.shield.effect.base },
            { labelIntlID: "ToolTipType/SeresQ2Damage", values: Constants.Q.second_damage.base },
            { labelIntlID: "ToolTipType/StunTime", values: Constants.Q.stun },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown }
        ]
    })
}
