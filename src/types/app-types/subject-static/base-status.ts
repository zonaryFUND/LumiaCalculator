import Decimal from "decimal.js";
import Dictionary from "dictionary/base-status.json";

type BaseStatusType = {
    maxHp: Decimal,
    maxSp: Decimal,
    hpRegen: Decimal,
    spRegen: Decimal,
    attackPower: Decimal,
    defense: Decimal,
    attackSpeed: Decimal,
    moveSpeed: Decimal
};

export const [BaseStatus, Subjects] = Dictionary.reduce(([rawData, ids], entry) => {
    const name = entry.name.toLowerCase();
    return [
        {
            ...rawData,
            [name]: {
                maxHp: new Decimal(entry.maxHp).round(),
                maxSp: new Decimal(entry.maxSp).round(),
                hpRegen: new Decimal(entry.hpRegen).cut(2, "round"),
                spRegen: new Decimal(entry.spRegen).cut(2, "round"),
                attackPower: new Decimal(entry.attackPower).round(),
                defense: new Decimal(entry.defense).round(),
                attackSpeed: new Decimal(entry.attackSpeed).cut(2, "round"),
                moveSpeed: new Decimal(entry.moveSpeed).cut(2, "round")
            }
        },
        ids.concat(name)
    ];
}, [{} as {[subjectID: string]: BaseStatusType}, [] as string[]]);

export type SubjectID = typeof Subjects[number];
