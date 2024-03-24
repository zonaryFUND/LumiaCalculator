export type EquipmentAbilityID = "primodal_hex" | "vigor" | "magnetic_midnight" | "smolder" | "lichs_grasp" |
    "zephyr" | "healing_reduction_weak" | "charge_carrior" | "biotic_infusion" | "in_full_bloom" | "swift_strides" |
    "double_tap" | "last_word" | "lead_shell" | "rudra_embodied" | "streamlined" |
    "swift_strides_vf" | "biotic_infusion_vf" | "flame_barrior_vf" | "necrosis" |
    "flame_barrier" | "reflection" | "vanguard" | "debilitation" | "verdict" | "encourage" |"bloodpact" |
    "electric_shock" | "photon_launcher" | "circulation" | "pulverization" | "healing_reduction_strong"

export type EquipmentAbility = {
    id: EquipmentAbilityID
    values?: any
}

export function parseEquipmentAbility(input: string): EquipmentAbility[] {
    return input.split(/(?<=]),?/)
        .map(part => part.trim())
        .filter(part => part.length > 0)
        .map(part => {
            const [id, rawValues] = part.split(/\[(.*)\]/)
                .map(p => p.trim())
                .filter(p => p.length > 0);
            
            const values = rawValues == undefined ? undefined : JSON.parse(`{${rawValues}}`);
            return { id: id as EquipmentAbilityID, values }
        });
}

import Dict from "dict/equipment-ability-name.json"
import { Language, NameType } from "./language";

export function name(id: EquipmentAbilityID, language: Language): string {
    console.log(id)
    return (Dict as {[index: string]: NameType})[id][language]
}