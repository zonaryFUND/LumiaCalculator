import Dict from "dictionary/equipment-ability-name.json"
import { Language, NameType } from "app-types/language";
import { EquipmentAbilityID } from "./id";

export function name(id: EquipmentAbilityID, language: Language): string {
    return (Dict as {[index: string]: NameType})[id][language]
}