import Decimal from "decimal.js";
import Dictionary from "@app/ingame-params/json/levelup-status.json";
import { SubjectCode } from "./base-status";

type LevelUpStatusType = {
    maxHp: Decimal,
    maxSp: Decimal,
    hpRegen: Decimal,
    spRegen: Decimal,
    attackPower: Decimal,
    defense: Decimal
};

export const LevelUpStatus = Dictionary.reduce((rawData, entry) => {
    return {
        ...rawData,
        [entry.code]: {
            maxHp: new Decimal(entry.maxHp),
            maxSp: new Decimal(entry.maxSp),
            hpRegen: new Decimal(entry.hpRegen),
            spRegen: new Decimal(entry.spRegen),
            attackPower: new Decimal(entry.attackPower),
            defense: new Decimal(entry.defense).cut(1, "round")
        }
    };
}, {} as {[subjectCode: SubjectCode]: LevelUpStatusType});
