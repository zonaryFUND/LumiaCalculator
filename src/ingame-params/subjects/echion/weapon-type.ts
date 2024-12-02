import { EquipmentID } from "app-types/equipment";

export function weaponType(weapon: EquipmentID | null): "blackmamba" | "sidewinder" | "deathadder" | null {
    if (weapon == null) return null;

    if ([131401, 131501, 131502, 131503].includes(weapon)) {
        return "deathadder";
    }
    if ([131402, 131504, 131505, 131506].includes(weapon)) {
        return "blackmamba";
    }
    return "sidewinder";
}