import { Language } from "app-types/language";
import { TierID } from "./id";

const tier: any = {
    epic: {
        jp: "英雄"
    },
    legendary: {
        jp: "伝説"
    },
    mythic: {
        jp: "神話"
    }
}

export function tierName(id: TierID, language: Language): string {
    return tier[id][language];
}