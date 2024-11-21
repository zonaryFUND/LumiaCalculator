import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1049100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, status }) => {
        const base = {
            1: Constants.T.shared_cooldown[skillLevel],
            2: Constants.T.stack_cooldown_reduction,
            3: Constants.T.max_stack,
            4: Constants.T.shield.duration,
        };
        
        if (showEquation) {
            return {
                ...base,
                0: `${Constants.T.damage.attack[skillLevel]}%`,
                5: Constants.T.shield.effect.consumedStack,
                6: `${Constants.T.shield.effect.attack}%`
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
