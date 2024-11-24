import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

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
        values: ({ showEquation }) => {
            const common = {
                0: RatioPercent(Constants.R.damage_amp_per_vf), 
                2: Constants.R.overflow,
                3: RatioPercent(Constants.R.movement_speed),
                4: Constants.R.area_damage_tick,
                6: Constants.R.kill_extend,
                7: Constants.R.overload,
                9: `${Constants.R.range_penalty}m`,
            };
            if (showEquation) {
                return {
                    ...common,
                    5: Constants.R.area_damage.base,
                    10: constant.damage.base,
                    11: RatioPercent(constant.damage.attack),
                    12: type == "blackmamba" ? Constants.R2.second : 
                        type == "sidewinder" ? RatioPercent(Constants.R1.slow.effect) : Constants.R.extend,
                    13: type == "blackmamba" ? RatioPercent(Constants.R2.second_damage) :
                        type == "sidewinder" ? Constants.R.extend : Constants.R.cooldown_reduction,
                    14: type == "blackmamba" ? Constants.R2.airborne : 
                        type == "sidewinder" ? Constants.R.cooldown_reduction :RatioPercent(Constants.R.area_damage.attack),
                    15: RatioPercent(Constants.R.area_damage.attack),
                    16: type == "sidewinder" ? Constants.R1.slow.duration : Constants.R.extend,
                    17: Constants.R.cooldown_reduction,
                    18: RatioPercent(Constants.R.area_damage.attack),
                    21: RatioPercent(Constants.R2.damage.additionalMaxHP) 

                };
            } else {   
                return {
                    ...common,
                    5: Constants.R.area_damage,
                    10: constant.damage,
                    12: type == "sidewinder" ? RatioPercent(Constants.R1.slow.effect) : Constants.R.extend,
                    13: type == "blackmamba" ? RatioPercent(Constants.R2.second_damage) : 
                        type == "sidewinder" ? Constants.R.extend : Constants.R.cooldown_reduction,
                    14: type == "sidewinder" ? Constants.R.cooldown_reduction : Constants.R2.airborne,
                    15: Constants.R1.slow.duration,
                    16: Constants.R.extend,
                    17: Constants.R.cooldown_reduction
                };
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
