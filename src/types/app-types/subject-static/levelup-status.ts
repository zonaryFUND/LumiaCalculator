import Decimal from "decimal.js";
import { NimbleAPIJSON } from "@params-json";
import { SubjectCode } from "./base-status";

export type LevelUpStatusType = {
    maxHp: Decimal,
    hpRegen: Decimal,
    attackPower: Decimal,
    defense: Decimal
};

/**
 * 各実験体のレベルアップ時上昇ステータス（Lv1ごと）
 * 
 * Key: 実験体ID（数値）
 */
export const LevelUpStatus = NimbleAPIJSON.LevelUpStatus.reduce((rawData, entry) => {
    return {
        ...rawData,
        [entry.code]: {
            maxHp: new Decimal(entry.maxHp),
            hpRegen: new Decimal(entry.hpRegen),
            attackPower: new Decimal(entry.attackPower),
            defense: new Decimal(entry.defense).cut(1, "round")
        }
    };
}, {} as Record<SubjectCode, LevelUpStatusType>);
