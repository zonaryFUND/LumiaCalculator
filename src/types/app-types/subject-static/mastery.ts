import Decimal from "decimal.js";
import { WeaponTypeID } from "../equipment/weapon";
import { SubjectCode } from "./base-status"
import { NimbleAPIJSON } from "@params-json"

/**
 * 武器熟練度に応じたステータス上昇の種類と量（熟練度1ごと）
 */
export type Mastery = {
    /**
     * 熟練度比例で上昇するステータスの種類。基本攻撃増幅/スキル増幅/攻撃力のいずれか
     */
    type: "basic_attack_amp" | "skill_amp" | "attack_power"
    /**
     * typeで指定されたステータスが熟練度1ごとに上昇する量
     */
    value: Decimal
    /**
     * 熟練度1ごとに上昇する攻撃速度（％表記）
     */
    attackSpeed: Decimal
}

/**
 * 全実験体の武器種ごとの武器熟練度比例ステータス情報を格納したDictionary
 */
export const WeaponMasteryStatus = NimbleAPIJSON.SubjectMasteryIncrement.reduce((prev, entry) => {
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
}, {} as Record<SubjectCode, Partial<Record<WeaponTypeID, Mastery>>>);
