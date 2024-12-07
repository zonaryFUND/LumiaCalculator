import Decimal from "decimal.js";
import Dictionary from "@app/ingame-params/json/base-status.json";
import { Status } from "app-types/subject-dynamic/status/type";

type BaseStatusType = Partial<Record<keyof Status, Decimal>>;

export const [BaseStatus, SubjectCodeWithOldID, SubjectCodeMax] = Dictionary.reduce(([rawData, apiCodeDictionary, codeMax], entry) => {
    const sanitizedID = (() => {
        const lowercase = entry.name.toLowerCase();
        if (lowercase == "lidailin") return "li_dailin";
        if (lowercase == "debimarlene") return "debi_marlene";
        if (lowercase == "lyanh") return "ly_anh";
        return lowercase;
    })();

    return [
        {
            ...rawData,
            [entry.code]: {
                maxHp: new Decimal(entry.maxHp).round(),
                maxSp: new Decimal(entry.maxSp).round(),
                hpRegen: new Decimal(entry.hpRegen).cut(2, "round"),
                spRegen: new Decimal(entry.spRegen).cut(2, "round"),
                attackPower: new Decimal(entry.attackPower).round(),
                defense: new Decimal(entry.defense).round(),
                attackSpeed: new Decimal(entry.attackSpeed).cut(2, "round"),
                moveSpeed: new Decimal(entry.moveSpeed).cut(2, "round")
            } as BaseStatusType
        } satisfies Record<SubjectCode, BaseStatusType>,
        {
            ...apiCodeDictionary,
            [entry.code]: sanitizedID
        },
        Math.max(codeMax, entry.code)
    ];
}, [
    {} as Record<SubjectCode, BaseStatusType>, 
    {} as Record<number, string>,
    0
]);

export type SubjectCode = number;
