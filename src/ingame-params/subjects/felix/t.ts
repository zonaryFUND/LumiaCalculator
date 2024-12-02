import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1049100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            1: Constants.T.shared_cooldown,
            2: Constants.T.stack_cooldown_reduction,
            3: Constants.T.max_stack,
            4: Constants.T.shield.duration,
        };
        
        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.T.damage.attack),
                5: Constants.T.shield.effect.consumedStack,
                6: RatioPercent(Constants.T.shield.effect.attack)
            } as Record<number, number | string | ValueRatio>
        } else {
            const shieldMin = {
                attack: Constants.T.shield.effect.attack
            };

            return {
                ...base,
                0: Constants.T.damage,
                5: {...shieldMin},
                6: {base: Constants.T.shield.effect.consumedStack * 10, ...shieldMin}
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.T.damage.attack, percent: true},
            {labelIntlID: "ToolTipType/ActiveSkillCooldown", values: Constants.T.shared_cooldown}
        ]  
    })
}
