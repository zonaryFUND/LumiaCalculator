import { EquipmentStatusDictionary } from "app-types/equipment";
import { SubjectConfig } from "./type";
import { meleeOrRange, WeaponTypeID } from "app-types/equipment/weapon";

export default function weaponRange(config?: SubjectConfig): "melee" | "range" {
    if (config?.subject == 24) {
        return "range";
    }

    if (config?.equipment.Weapon == null) return "melee";
    return meleeOrRange(EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID)
}