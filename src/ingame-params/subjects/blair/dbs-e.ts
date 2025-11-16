import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { ValueRatio } from "app-types/value-ratio";
import { weaponSkillLevel } from "./weapon-skill-level";

export const code = 1084410;

export function comboShield(weaponSkillLevel: number): ValueRatio {
    return {
        ...Constants.DoubleBladedSwordE.combo_shield,
        base: Constants.DoubleBladedSwordE.combo_shield.base[weaponSkillLevel]
    }
}

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.DoubleBladedSwordE.cooldown,
    consumption: {
        type: "vp",
        value: Constants.DoubleBladedSwordE.vp_cost
    },
    values: ({ config, showEquation }): TooltipValues => {
        const comboShieldRatio = comboShield(weaponSkillLevel(config.weaponMastery));

        if (showEquation) {
            return {
                0: Constants.DoubleBladedSwordE.damage.base,
                1: RatioPercent(Constants.DoubleBladedSwordE.damage.additionalAttack),
                2: Constants.DoubleBladedSwordE.shield.duration,
                3: Constants.DoubleBladedSwordE.shield.effect.base,
                4: RatioPercent(Constants.DoubleBladedSwordE.shield.effect.additionalAttack),
                5: comboShieldRatio.base!,
                6: RatioPercent(comboShieldRatio.additionalAttack!),
                7: Constants.DoubleBladedSwordE.max_combo_hit
            }
        } else {
            return {
                0: Constants.DoubleBladedSwordE.damage,
                1: Constants.DoubleBladedSwordE.shield.duration,
                2: Constants.DoubleBladedSwordE.shield.effect,
                3: comboShieldRatio
            }
        }
    },
    expansion: () => ({
        tipValues: Constants.DoubleBladedSwordE.combo_shield.base,
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.DoubleBladedSwordE.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.DoubleBladedSwordE.shield.effect.base}
        ]  
    })
}
