import { PerpetualOuterBuffDefinition } from "./type";
import Havoc from "@app/ingame-params/augment/havoc";
import Chaos from "@app/ingame-params/augment/chaos";
import Fortification from "@app/ingame-params/augment/fortification";
import Decimal from "decimal.js";
import { SubjectConfig } from "core/subject-dynamic/config";

export const AugmentPerpetualBuffDefinitions: (config: SubjectConfig, hp: number) => Record<string, PerpetualOuterBuffDefinition> = (config, hp) => ({
    /**
     * 狩猟 - クマ
     */
    "Trait/Name/7011101": {
        availableStacks: [0, 10, 20, 30, 40, 50, 60, 70, 80],
        buff: stack => ({
            adaptiveForce: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7011101",
                calculationType: "sum",
                value: {
                    type: "constant",
                    value: Havoc.bear_mask.base.adaptiveForce + stack / 10 * Havoc.bear_mask.stack_buff.adaptive
                }
            }
        })
    },

    /**
     * 狩猟 - イノシシ
     */
    "Trait/Name/7011201": {
        availableStacks: [0, 10, 20, 30, 40, 50, 60, 70, 80],
        buff: stack => ({
            maxHp: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7011201",
                calculationType: "sum",
                value: {
                    type: "constant",
                    value: Havoc.boar_mask.base.maxHP + stack / 10 * Havoc.boar_mask.stack_buff.maxHP
                }
            }
        })
    },

    /**
     * 狩猟 -　オオカミ
     */
    "Trait/Name/7011310": {
        availableStacks: [0, 10, 20, 30, 40, 50, 60, 70, 80],
            buff: stack => ({
            maxHp: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7011301",
                calculationType: "mul",
                value: {
                    type: "constant",
                    value: Havoc.wolf_mask.base.attackSpeed + stack / 10 * Havoc.wolf_mask.stack_buff.attackSpeed
                }
            }
        })
    },

    /**
     * 力の蓄積
     */
    "Trait/Name/7310101": {
        availableStacks: ["day.1.noon","day.1.night","day.2.noon","day.2.night","day.2.noon","day.3.night","day.3.noon","day.4.night","day.5.noon","day.5.night","day.6.noon","day.6.night","day.7.noon"],
        buff: stack => ({
            adaptiveForce: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7310101",
                calculationType: "sum",
                value: {
                    type: "constant",
                    value: Chaos.power_crescendo.adaptive[stack]
                }
            }
        })
    },

    /**
     * オーバーウォッチ
     */
    "Trait/Name7310301": {
        buff: _ => ({
            cooldownReduction: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7310301",
                calculationType: "sum",
                value: {
                    type: "constant",
                    value: Chaos.overwatch.cooldown
                }
            },
            adaptiveForce: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7310301",
                calculationType: "sum",
                value: {
                    type: "status-conversion",
                    func: status => status.cooldownReduction.rawHasteValue.greaterThan(Chaos.overwatch.threshold) ? Chaos.overwatch.adaptive : 0
                }
            }
        })
    },

    /**
     * R_echarger
     */
    "Trait/Name/7310501": {
        buff: _ => ({
            ultCooldownReduction: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7310501",
                calculationType: "sum",
                value: {
                    type: "constant",
                    value: Chaos.r_echarger.effect
                }
            }
        })
    },

    /**
     * 鎮痛剤
     */
    "Trait/Name/7111001": {
        buff: _ => ({
            defense: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7111001",
                calculationType: "mul",
                value: {
                    type: "constant",
                    value: new Decimal(100).sub(Math.max(hp, Fortification.painkiller.defense_max.hp)).div(100 - Fortification.painkiller.defense_max.hp).times(Fortification.painkiller.defense_max.effect)
                }
            }
        })
    },

    /**
     * 堅固
     */
    "Trait/Name/7110401": {
        buff: _ => ({
            tenacity: {
                origin: "perpetual_status",
                intlID: "Trait/Name/7110401",
                calculationType: "sum",
                value: {
                    type: "constant",
                    value: Fortification.steadfast.tenacity.base + Fortification.steadfast.tenacity.level * config.level
                }
            }
        })
    }
})