import { EquipmentStatusDictionary } from "app-types/equipment";
import { SubjectConfig } from "./type";
import { meleeOrRange, WeaponTypeID } from "app-types/equipment/weapon";
import { useMemo } from "react";

export default function useRange(config?: SubjectConfig): "melee" | "range" {
    return useMemo(() => {
        if (config?.equipment.weapon == null) return "melee";
        return meleeOrRange(EquipmentStatusDictionary[config.equipment.weapon].type as WeaponTypeID)
    }, [config?.equipment.weapon]);
}