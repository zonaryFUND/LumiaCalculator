import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { ValueRatio } from "core/value-ratio";

export const code = 1080300;

const healMax = {
    base: Constants.W.heal.base.map(v => v * Constants.W.heal_max_multiplier),
    attack: Constants.W.heal.attack * Constants.W.heal_max_multiplier
}

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        return {
            0: Constants.W.shield.duration,
            1: RatioPercent(Constants.W.heal_max_hp),
            2: Constants.W.damage.base,
            3: RatioPercent(Constants.W.damage.attack),
            4: Constants.W.shield.effect.base,
            5: RatioPercent(Constants.W.shield.effect.attack),
            6: Constants.W.variable_damage.base,
            7: RatioPercent(Constants.W.variable_damage.attack),
            8: Constants.W.heal.base,
            9: RatioPercent(Constants.W.heal.attack),
            10: healMax.base,
            11: RatioPercent(healMax.attack),
            20: Constants.W.damage,
            21: Constants.W.shield.effect,
            22: Constants.W.variable_damage,
            23: Constants.W.heal,
            24: healMax
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.W.animal_target_heal)
        },
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base },
            { labelIntlID: "ToolTipType/IstvanCloneDamage", values: Constants.W.variable_damage.base },
            { labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.effect.base },
            { labelIntlID: "ToolTipType/MinHpHeal", values: Constants.W.heal.base },
            { labelIntlID: "ToolTipType/MaxHpHeal", values: healMax.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown }
        ]
    })
}
