import { AppTextKey } from "./key";
import { NameType } from "./language";

export const AppTexts: {[key in AppTextKey]: NameType} = {
    subject: {
        jp: "実験体"
    },
    equipment: {
        jp: "装備"
    },
    "max-hp": {
        jp: "最大体力"
    }
}