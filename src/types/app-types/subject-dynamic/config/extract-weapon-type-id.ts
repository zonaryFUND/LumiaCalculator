import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "./type";
import { EquipmentStatusDictionary } from "app-types/equipment";

export default function extractWeaponTypeID(config: SubjectConfig): WeaponTypeID | undefined {
    if (config.equipment.weapon == undefined) return undefined;

    return EquipmentStatusDictionary[config.equipment.weapon].type as WeaponTypeID;
}