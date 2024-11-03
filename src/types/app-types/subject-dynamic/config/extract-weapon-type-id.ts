import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "./type";
import { equipmentStatus } from "app-types/equipment";

export default function extractWeaponTypeID(config: SubjectConfig): WeaponTypeID | undefined {
    if (config.equipment.weapon == undefined) return undefined;

    return equipmentStatus(config.equipment.weapon).type as WeaponTypeID;
}