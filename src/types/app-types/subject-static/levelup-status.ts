import Decimal from "decimal.js";
import { NimbleAPIJSON } from "@params-json";
import { SubjectCode } from "./base-status";

/**
 * 実験体がレベルアップするごとに得られるステータス値を格納するオブジェクト
 */
export type LevelUpStatusType = {
    /**
     * 最大体力
     */
    maxHp: Decimal

    /**
     * 最大スタミナ
     */
    maxSp: Decimal

    /**
     * 体力再生
     */
    hpRegen: Decimal

    /**
     * スタミナ再生
     */
    spRegen: Decimal

    /**
     * 攻撃力
     */
    attackPower: Decimal

    /**
     * 防御力
     */
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
            maxSp: new Decimal(entry.maxSp),
            hpRegen: new Decimal(entry.hpRegen),
            spRegen: new Decimal(entry.spRegen),
            attackPower: new Decimal(entry.attackPower),
            defense: new Decimal(entry.defense).cut(1, "round")
        }
    };
}, {} as Record<SubjectCode, LevelUpStatusType>);
