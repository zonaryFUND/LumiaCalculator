import Name from "dictionary/subject-name.json";
import { SubjectID } from "./id";
import { Language, NameType } from "app-types/language";

export function name(id: SubjectID, language: Language): string {
    return (Name as {[index: string]: NameType})[id][language]
}