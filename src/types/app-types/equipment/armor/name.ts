import { Language, NameType } from "app-types/language";
import { ArmorID } from "./id";
import ArmorName from "dictionary/armor-name.json";

export function name(id: ArmorID, language: Language): string {
    return (ArmorName as {[index: string]: NameType})[id][language]
}