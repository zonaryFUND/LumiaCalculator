import { EquipmentID } from "./id";
import { Language } from "../language";
import { name as weaponName } from "./weapon";
import { name as armorName, Arms, Chests, Heads, Legs } from "./armor";

export function name(id: EquipmentID, language: Language): string {
    if ([...Chests, ...Heads, ...Arms, ...Legs].includes(id)) {
        return armorName(id, language);
    } else {
        return weaponName(id, language);
    }
}
