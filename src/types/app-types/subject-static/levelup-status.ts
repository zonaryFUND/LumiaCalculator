import Decimal from "decimal.js";
import Dictionary from "dictionary/levelup-status.json";

type LevelUpStatusType = {
    maxHp: Decimal,
    maxSp: Decimal,
    hpRegen: Decimal,
    spRegen: Decimal,
    attackPower: Decimal,
    defense: Decimal
};

export const LevelUpStatus = Dictionary.reduce((rawData, entry) => {
    const name = entry.name.toLowerCase();
    return {
        ...rawData,
        [name]: {
            maxHp: new Decimal(entry.maxHp),
            maxSp: new Decimal(entry.maxSp),
            hpRegen: new Decimal(entry.hpRegen),
            spRegen: new Decimal(entry.spRegen),
            attackPower: new Decimal(entry.attackPower),
            defense: new Decimal(entry.defense).cut(1, "round")
        }
    };
}, {} as {[subjectID: string]: LevelUpStatusType});
