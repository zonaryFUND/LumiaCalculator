import { EquipmentStatusDictionary } from "app-types/equipment";
import { SubjectConfig } from "./type";
import { meleeOrRange, WeaponTypeID } from "app-types/equipment/weapon";

export default function weaponRange(config?: SubjectConfig): "melee" | "range" {
    if (config?.equipment.weapon == null) return "melee";
    return meleeOrRange(EquipmentStatusDictionary[config.equipment.weapon].type as WeaponTypeID)
}