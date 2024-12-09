import Decimal from "decimal.js";
import { WeaponTypeID } from "../equipment/weapon";
import { SubjectCode } from "./base-status"
import Dictionary from "@app/ingame-params/json/mastery.json";

export type Mastery = {
    type: "basic_attack_amp" | "skill_amp" | "attack_power"
    value: Decimal
    attackSpeed: Decimal
}

export const WeaponMasteryStatus = Dictionary.reduce((prev, entry) => {
    if (entry.characterCode == 0) return prev;

    const type = (() => {
        switch (entry.secondOption) {
            case "IncreaseBasicAttackDamageRatio": return "basic_attack_amp";
            case "SkillAmpRatio": return "skill_amp";
            default: return "attack_power";
        }
    })();
    const value = new Decimal(entry.secondOptionSection1Value).times(type == "attack_power" ? 1 : 100);
    const attackSpeed = new Decimal(entry.firstOptionSection1Value).times(100);

    return {
        ...prev,
        [entry.characterCode]: {
            ...(entry.characterCode in prev ? prev[entry.characterCode] : {}),
            [entry.type]: { type, value, attackSpeed }
        }
    }
}, {} as {
    [subjectCode: SubjectCode]: Partial<{ [weapon in WeaponTypeID]: Mastery }>
});
