import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "./type";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { WeaponMasteryStatus } from "app-types/subject-static";

export default function extractWeaponTypeID(config: SubjectConfig): WeaponTypeID | undefined {
    if (config.equipment.weapon == undefined) return undefined;

    return EquipmentStatusDictionary[config.equipment.weapon].type as WeaponTypeID;
}

export function AdaptiveTarget(config: SubjectConfig): "attackPower" | "skillAmp" {
    const weapon = extractWeaponTypeID(config);
    if (weapon == undefined) return "attackPower";
    return WeaponMasteryStatus[config.subject][weapon]?.type == "skill_amp" ? "skillAmp" : "attackPower";
}