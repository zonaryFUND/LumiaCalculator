import { EquipmentID } from "core/equipment"

/**
 * 実験体の現在の装備
 */
export type Equipment = {
    /**
     * 武器
     */
    Weapon: EquipmentID | null

    /**
     * 胴装備
     */
    Chest: EquipmentID | null

    /**
     * 胴装備がDavidにアップグレードされているかどうか
     */
    isChestDavid?: boolean

    /**
     * 頭装備
     */
    Head: EquipmentID | null

    /**
     * 腕装備
     */
    Arm: EquipmentID | null

    /**
     * 足装備
     */
    Leg: EquipmentID | null
}