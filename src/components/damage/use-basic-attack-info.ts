import { equipmentStatus } from "app-types/equipment";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "app-types/subject-dynamic/status/standard-values";
import * as React from "react";

export default function useBasicAttackInfo(config: SubjectConfig): [number | undefined, string | undefined] {
    return React.useMemo(() => {
        if (config.equipment.weapon == null) return [undefined, undefined];
        const weaponType = equipmentStatus(config.equipment.weapon).type as WeaponTypeID
        if (weaponType == "assault_rifle") {
            return [
                AssaultRifleAttackRatio.reduce((p, c) => p + c, 0),
                "app.basic-attack.assault-rifle"
            ]
        }
        if (weaponType == "dual_swords") {
            return [
                DualSwordsAttackRatio.reduce((p, c) => p + c, 0),
                "app.basic-attack.dual-sword"
            ]
        }
        return [100, "app.basic-attack"]
    }, [config.equipment.weapon]);
}