import Decimal from "decimal.js";
import { NimbleAPIJSON } from "@params-json";
import { Status } from "core/subject-dynamic/status/type";

/**
 * 実験体のステータスJSONのうち、共通してゼロであるものを除いた、基礎ステータス数値の部分オブジェクト
 */
export type BaseStatusType = {
    maxHp: Decimal
    hpRegen: Decimal
    attackPower: Decimal
    defense: Decimal
    attackSpeed: Decimal
    moveSpeed: Decimal
};

const [
    baseStatus, 
    subjectCodeMax
] = NimbleAPIJSON.SubjectBaseStatus.reduce(([rawData, codeMax], entry) => {
    return [
        {
            ...rawData,
            [entry.code]: {
                maxHp: new Decimal(entry.maxHp).round(),
                hpRegen: new Decimal(entry.hpRegen).cut(2, "round"),
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
//export const SubjectCodeMax = subjectCodeMax;
export const SubjectCodeMax = 90;

/**
 * 実験体ID（数字）
 */
export type SubjectCode = number;
