import { WeaponID } from "app-types/equipment/weapon";
import { ArmID, ChestID, HeadID, LegID } from "app-types/equipment/armor";

export type Equipment = {
    weapon: WeaponID | null
    chest: ChestID | null
    head: HeadID | null
    arm: ArmID | null
    leg: LegID | null
}