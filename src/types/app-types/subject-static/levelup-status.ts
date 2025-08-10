import Decimal from "decimal.js";
import { NimbleAPIJSON } from "@params-json";
import { SubjectCode } from "./base-status";

type LevelUpStatusType = {
    maxHp: Decimal,
    maxSp: Decimal,
    hpRegen: Decimal,
    spRegen: Decimal,
    attackPower: Decimal,
    defense: Decimal
};

export const LevelUpStatus = NimbleAPIJSON.LevelUpStatus.reduce((rawData, entry) => {
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
