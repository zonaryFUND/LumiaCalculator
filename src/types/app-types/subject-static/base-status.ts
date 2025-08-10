import Decimal from "decimal.js";
import { NimbleAPIJSON } from "@params-json";
import { Status } from "app-types/subject-dynamic/status/type";

type BaseStatusType = {
    maxHp: Decimal
    maxSp: Decimal
    hpRegen: Decimal
    spRegen: Decimal
    attackPower: Decimal
    defense: Decimal
    attackSpeed: Decimal
    moveSpeed: Decimal
};

const [
    baseStatus, 
    subjectCodeMax
] = NimbleAPIJSON.SubjectBaseStatus.reduce(([rawData, codeMax], entry) => {
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
            } satisfies BaseStatusType
        } satisfies Record<SubjectCode, BaseStatusType>,
        Math.max(codeMax, entry.code)
    ];
}, [
    {} as Record<SubjectCode, BaseStatusType>, 
    0
]);

/**
 * 実験体の基礎ステータス（Lv1、無装備時）
 */
export const BaseStatus = baseStatus;

/**
 * 実験体IDの最大値（リスト列挙用）
 */
export const SubjectCodeMax = subjectCodeMax;

/**
 * 実験体ID（数字）
 */
export type SubjectCode = number;
