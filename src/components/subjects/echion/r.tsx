import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import Decimal from "decimal.js";
import { ValueRatio } from "app-types/value-ratio";

export const ViperRCode = 1044500
export const DeathadderRCode = 1044501
export const BlackmambaRCode = 1044502
export const SidewinderRCode = 1044503

export const difinitions = [
    // viper
    {code: ViperRCode, type: "viper", active: Constants.R0_1.damage, constant: Constants.R0_1},
    // deathadder
    {code: DeathadderRCode, type: "deathadder", active: Constants.R3.damage, constant: Constants.R3},
    // blackmamba
    {code: BlackmambaRCode, type: "blackmamba", active: Constants.R2.damage, constant: Constants.R2},
    // sidewinder
    {code: SidewinderRCode, type: "sidewinder", active: Constants.R1.damage, constant: Constants.R1}
].reduce((prev, {code, type, active, constant}) => ({
    ...prev,
    [code]: {
        skill: "R",
        cooldown: 0,
        values: ({ showEquation, skillLevel, config }) => {
            const amp = new Decimal(config.gauge).times(Constants.R.damage_amp_per_vf[config.skillLevels.R]).toString();
            const common = {
                0: `${amp}%`, 
                2: Constants.R.overflow,
                3: `${Constants.R.movement_speed}%`,
                4: Constants.R.area_damage_tick,
                6: Constants.R.kill_extend,
                7: Constants.R.overload,
                9: `${Constants.R.range_penalty}m`,
            } satisfies Record<number, number | string | ValueRatio>;
            if (showEquation) {
                return {
                    ...common,
                    5: Constants.R.area_damage.base[skillLevel],
                    10: constant.damage.base[skillLevel],
                    11: `${constant.damage.attack}%`,
                    12: type == "blackmamba" ? Constants.R2.second : 
                        type == "sidewinder" ? `${Constants.R1.slow.effect}%` : Constants.R.extend,
                    13: type == "blackmamba" ? `${Constants.R2.second_damage[skillLevel]}%` :
                        type == "sidewinder" ? Constants.R.extend : Constants.R.cooldown_reduction,
                    14: type == "blackmamba" ? Constants.R2.airborne : 
                        type == "sidewinder" ? Constants.R.cooldown_reduction :`${Constants.R.area_damage.attack}%`,
                    15: `${Constants.R.area_damage.attack}%`,
                    16: type == "sidewinder" ? Constants.R1.slow.duration : Constants.R.extend,
                    17: Constants.R.cooldown_reduction,
                    18: `${Constants.R.area_damage.attack}%`,
                    21: `${Constants.R2.damage.additionalMaxHP}%` 

                } as Record<number, number | string | ValueRatio>
            } else {   
                return {
                    ...common,
                    5: Constants.R.area_damage,
                    10: constant.damage,
                    12: type == "sidewinder" ? `${Constants.R1.slow.effect}%` : Constants.R.extend,
                    13: type == "blackmamba" ? `${Constants.R2.second_damage[skillLevel]}%` : 
                        type == "sidewinder" ? Constants.R.extend : Constants.R.cooldown_reduction,
                    14: type == "sidewinder" ? Constants.R.cooldown_reduction : Constants.R2.airborne,
                    15: Constants.R1.slow.duration,
                    16: Constants.R.extend,
                    17: Constants.R.cooldown_reduction
                } as Record<number, number | string | ValueRatio>
            }
        }, 
        expansion: () => ({
            enumeratedValues: [
                {labelIntlID: "ToolTipType/VFIncreaseBarrier", values: Constants.R.damage_amp_per_vf, percent: true},
                {labelIntlID: "ToolTipType/VFOverAreaDamage", values: Constants.R.area_damage.base},
                {labelIntlID: "ToolTipType/EchionActive4Damage", values: active.base}
            ].concat((() => {
                switch (code) {
                    case 10440501:
                        return [
                            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.R3.attack_speed, percent: true}
                        ]
                    case 1044502:
                        return [
                            {labelIntlID: "ToolTipType/EchionActive4AddDamage", values: Constants.R2.second_damage, percent: true},
                            {labelIntlID: "ToolTipType/SkillLifeStealRatio", values: Constants.R2.skill_lifesteal, percent: true}
                        ]
                    case 1044503:
                        return [
                            {labelIntlID: "StatType/IncreaseSkillDamage", values: Constants.R1.skill_damage_add, percent: true}
                        ]
                    default:
                        return [];
                }
            })())
        })
    } satisfies TooltipInfo
}), {} as Record<number, TooltipInfo>)
