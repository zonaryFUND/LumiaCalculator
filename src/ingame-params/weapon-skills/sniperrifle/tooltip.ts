import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";
import { calculateValue } from "app-types/value-ratio/calculation";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";

export const code = 3011000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.vision,
            1: Constants.cripping.vision,
            4: Constants.dead_to_rights.vision,
            6: Constants.cripping.slow.duration,
            7: RatioPercent(Constants.cripping.slow.effect),
            20: Constants.duration
        }
        if (showEquation) {
            return {
                ...base,
                2: RatioPercent(Constants.cripping.damage.additionalAttack),
                5: RatioPercent(Constants.dead_to_rights.damage.additionalAttack),
                8: RatioPercent(Constants.cripping.damage.amp),
                9: RatioPercent(Constants.dead_to_rights.damage.amp),
                10: Constants.cripping.damage.base,
                11: Constants.dead_to_rights.damage.base
            }
        } else {   
            return {
                ...base,
                2: Constants.cripping.damage,
                3: Constants.cripping.target_vision,
                5: Constants.dead_to_rights.damage,
            }
        }
    }, 
    expansion: ({ config, status }) => {
        const damage = calculateValue(Constants.dead_to_rights.damage, status, config, weaponSkillLevel(config.weaponMastery)).static.times(Constants.dead_to_rights.max_damage_multiplier);
        return {
            tipValues: {
                0: damage.toString()
            },
            enumeratedValues: [
                {labelIntlID: "ToolTipType/FirstDamage", values: Constants.cripping.damage.base},
                {labelIntlID: "ToolTipType/SecondDamage", values: Constants.dead_to_rights.damage.base},
                {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant},
                {labelIntlID: "ToolTipType/LegShotSkillAmpCoef", values: Constants.cripping.damage.amp, percent: true},
                {labelIntlID: "ToolTipType/DeadEyeSkillAmpCoef", values: Constants.dead_to_rights.damage.amp, percent: true}
            ]  
        }
    }
}
