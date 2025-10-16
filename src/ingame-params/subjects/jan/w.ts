import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1035300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const common = {
            2: Constants.W.enhanced_damage.base,
            4: Constants.W.enhanced_stun,
            5: Constants.W.stun,
        }

        if (showEquation) {
            return {
                ...common,
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.additionalAttack),
                3: RatioPercent(Constants.W.enhanced_damage.additionalAttack),
                6: RatioPercent(Constants.W.damage.amp),    
                7: RatioPercent(Constants.W.enhanced_damage.amp),
                10: Constants.W.wall_damage.base,
                11: RatioPercent(Constants.W.wall_damage.additionalAttack),
                12: RatioPercent(Constants.W.wall_damage.amp)
            }
        } else {
            return {
                ...common,
                8: Constants.W.damage,
                9: Constants.W.enhanced_damage,
                12: Constants.W.wall_damage
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.W.enhanced_damage.base}
        ]  
    })
}
