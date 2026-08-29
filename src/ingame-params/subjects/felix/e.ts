import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1049400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: { constant: Constants.T.shared_cooldown },
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.attack),
                2: Constants.E.enhanced_damage.base,
                3: RatioPercent(Constants.E.enhanced_damage.attack),
                4: Constants.E.enhanced_damage.level,
                8: Constants.E.omnisyphon.duration,
                9: Constants.E.omnisyphon.effect.perStack,
                10: RatioPercent(Constants.E.omnisyphon.effect.attack),
                12: Constants.E.stack_gain_max
            }
        } else {
            const minLifeSteal = {
                base: 1,
                attack: Constants.E.omnisyphon.effect.attack
            }
            const maxLifeSteal = {
                base: Constants.T.max_stack,
                attack: Constants.E.omnisyphon.effect.attack
            }

            return {
                0: Constants.E.damage,
                1: Constants.E.enhanced_damage,
                3: Constants.E.omnisyphon.duration,
                4: RatioPercent(minLifeSteal),
                5: RatioPercent(maxLifeSteal),
                6: Constants.E.stack_gain_max
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base },
            { labelIntlID: "ToolTipType/FinalSequenceDamage", values: Constants.E.enhanced_damage.base }
        ]
    })
}
