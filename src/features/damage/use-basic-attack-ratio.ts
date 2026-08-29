import { EquipmentStatusDictionary } from "core/equipment";
import { WeaponTypeID } from "core/equipment/weapon";
import { SubjectConfig } from "core/subject-dynamic/config";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "core/subject-dynamic/status/standard-values";
import * as React from "react";

/**
 * 基本攻撃の威力倍率、弾数を取得するフック。
 * 
 * ほとんどの基本攻撃の威力は攻撃力に等しいが、双剣など特殊な処理が存在するものはその値を返す。
 * 
 * また、ガーネットTのような弾数に依存する計算が存在する要素のため、弾数も返している。
 * 
 */
export default function useBasicAttackRatio(config: SubjectConfig): {
    attackRatio?: number,
    labelIntlID?: string,
    hitCount?: number
} {
    return React.useMemo(() => {
        if (config.equipment.Weapon == null) return { };
        const weaponType = EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID
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
    }, [config.equipment.Weapon]);
}