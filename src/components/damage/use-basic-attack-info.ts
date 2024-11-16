import { EquipmentStatusDictionary } from "app-types/equipment";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "app-types/subject-dynamic/status/standard-values";
import * as React from "react";

export default function useBasicAttackInfo(config: SubjectConfig): {
    attackRatio?: number,
    labelIntlID?: string,
    hitCount?: number
} {
    return React.useMemo(() => {
        if (config.equipment.weapon == null) return { };
        const weaponType = EquipmentStatusDictionary[config.equipment.weapon].type as WeaponTypeID
        if (weaponType == "AssaultRifle") {
            return {
                attackRatio: AssaultRifleAttackRatio.reduce((p, c) => p + c, 0),
                labelIntlID: "app.basic-attack.assault-rifle",
                hitCount: 3
            }
        }
        if (weaponType == "DualSword") {
            return {
                attackRatio: DualSwordsAttackRatio.reduce((p, c) => p + c, 0),
                labelIntlID: "app.basic-attack.dual-sword",
                hitCount: 2
            }
        }
        return {
            attackRatio: 100, 
            labelIntlID: "app.basic-attack"
        }
    }, [config.equipment.weapon]);
}