import EquipmentTypeName from "dictionary/equipment-type-name.json";
import { WeaponTypeID } from "./weapon";
import { ArmorTypeID } from "./armor";
import { Language, NameType } from "app-types/language";

export function typeName(id: WeaponTypeID | ArmorTypeID, language: Language): string {
    return (EquipmentTypeName as {[index: string]: NameType})[id][language]
}