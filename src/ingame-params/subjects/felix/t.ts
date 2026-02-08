import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1049100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        const base = {
            1: Constants.T.shared_cooldown,
            2: Constants.T.stack_cooldown_reduction,
            3: Constants.T.max_stack,
            4: Constants.T.shield.duration,
            7: Constants.T.duration
        };

        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.T.damage.attack),
                5: Constants.T.shield.effect.consumedStack,
                6: RatioPercent(Constants.T.shield.effect.attack)
            }
        } else {
            const shieldMin = {
                attack: Constants.T.shield.effect.attack
            };

            return {
                ...base,
                0: Constants.T.damage,
                5: { ...shieldMin },
                6: { base: Constants.T.shield.effect.consumedStack * 10, ...shieldMin }
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/SecondDamage", values: Constants.T.damage.attack, percent: true },
            { labelIntlID: "ToolTipType/ActiveSkillCooldown", values: Constants.T.shared_cooldown }
        ]
    })
}
