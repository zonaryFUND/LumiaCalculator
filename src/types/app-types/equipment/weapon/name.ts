import { Language, NameType } from "app-types/language";
import { WeaponID } from "./id";
import WeaponName from "dictionary/weapon-name.json";

export function name(id: WeaponID, language: Language): string {
    console.log(id)
    return (WeaponName as {[index: string]: NameType})[id][language]
}