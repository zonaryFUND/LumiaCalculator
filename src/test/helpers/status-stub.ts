import Decimal from "decimal.js";
import { Status } from "core/subject-dynamic/status/type";
import { StatusValue, CooldownStatusValue, MovementSpeedValue } from "core/subject-dynamic/status/value-component/type";

// core/**の純粋関数をテストする際、Statusの全フィールドを毎回手書きするのを避けるためのスタブ。
// 実データ・実キャラクターには一切依存しない（docs/testing-guidelines.md「①ロジック層」参照）。

/**
 * `calculatedValue`のみを指定した最小限のStatusValue
 */
export function statusValue(calculatedValue: Decimal.Value = 0): StatusValue {
    return {
        components: [],
        additionalValue: new Decimal(0),
        sum: new Decimal(calculatedValue),
        multiplier: new Decimal(0),
        calculatedValue: new Decimal(calculatedValue),
        digit: 0
    };
}

function cooldownStatusValue(): CooldownStatusValue {
    return {
        components: [],
        rawHasteValue: new Decimal(0),
        calculatedValue: new Decimal(0)
    };
}

function movementSpeedValue(): MovementSpeedValue {
    return {
        components: [],
        calculatedValue: new Decimal(0),
        rawResult: new Decimal(0)
    };
}

/**
 * テストに必要な項目だけを`overrides`で指定し、残りは0埋めしたStatusを組み立てる
 */
export function stubStatus(overrides: Partial<Status> = {}): Status {
    return {
        maxHp: statusValue(),
        hpRegen: statusValue(),
        defense: statusValue(),
        preventBasicAttackDamagedRatio: statusValue(),
        preventBasicAttackDamaged: statusValue(),
        preventSkillDamagedRatio: statusValue(),
        preventDamageRatio: statusValue(),
        increaseDamagedRatio: statusValue(),
        attackPower: statusValue(),
        increaseBasicAttackDamageRatio: statusValue(),
        basicAttackDamageFinalCorrectionRatio: statusValue(),
        increaseBasicAttackDamage: statusValue(),
        attackSpeed: statusValue(),
        criticalStrikeChance: statusValue(),
        criticalStrikeDamage: statusValue(),
        skillAmp: statusValue(),
        cooldownReduction: cooldownStatusValue(),
        ultCooldownReduction: cooldownStatusValue(),
        tacticalSkillCooldownReduction: cooldownStatusValue(),
        penetrationDefense: statusValue(),
        penetrationDefenseRatio: statusValue(),
        lifeSteal: statusValue(),
        normalLifeSteal: statusValue(),
        healerGiveHpHealRatio: statusValue(),
        hpHealedDecreaseRatio: statusValue(),
        hpHealedIncreaseRatio: statusValue(),
        increaseSkillDamageRatio: statusValue(),
        increaseDamageRatio: statusValue(),
        healerGiveHealShieldRatio: statusValue(),
        tenacity: statusValue(),
        moveSpeed: movementSpeedValue(),
        slowResist: statusValue(),
        sightRange: statusValue(),
        attackRange: statusValue(),
        ...overrides
    };
}
